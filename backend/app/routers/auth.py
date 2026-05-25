from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.models.models import RefreshTokenBlacklist, Usuario
from app.schemas.schemas import LoginIn, MsgOut, RefreshIn, TokenOut, UsuarioCreate, UsuarioOut

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/register", response_model=UsuarioOut, status_code=201)
def register(body: UsuarioCreate, db: Session = Depends(get_db)):
    if db.query(Usuario).filter(Usuario.email == body.email).first():
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")

    user = Usuario(
        nome=body.nome,
        sobrenome=body.sobrenome,
        apelido=body.apelido,
        email=body.email,
        senha=hash_password(body.senha),
        data_nascimento=body.data_nascimento,
        imagem=body.imagem,
        role="user",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=TokenOut)
def login(body: LoginIn, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == body.email).first()
    if not user or not verify_password(body.senha, user.senha):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return TokenOut(
        access_token=create_access_token(user.id_usuario, user.role),
        refresh_token=create_refresh_token(user.id_usuario),
    )

@router.post("/refresh", response_model=TokenOut)
def refresh(body: RefreshIn, db: Session = Depends(get_db)):
    # Verifica blacklist
    if db.query(RefreshTokenBlacklist).filter_by(token=body.refresh_token).first():
        raise HTTPException(status_code=401, detail="Refresh token revogado")

    payload = decode_token(body.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Refresh token inválido")

    user_id = int(payload["sub"])
    user = db.get(Usuario, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # Invalida o refresh token atual (rotação)
    db.add(RefreshTokenBlacklist(token=body.refresh_token))
    db.commit()

    return TokenOut(
        access_token=create_access_token(user.id_usuario, user.role),
        refresh_token=create_refresh_token(user.id_usuario),
    )

@router.post("/logout", response_model=MsgOut)
def logout(body: RefreshIn, db: Session = Depends(get_db)):
    if not db.query(RefreshTokenBlacklist).filter_by(token=body.refresh_token).first():
        db.add(RefreshTokenBlacklist(token=body.refresh_token))
        db.commit()
    return MsgOut(detail="Logout realizado com sucesso")
