from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import hash_password
from app.dependencies.auth import get_current_user, require_admin
from app.models.models import Usuario
from app.schemas.schemas import MsgOut, RoleUpdate, UsuarioOut, UsuarioUpdate

router = APIRouter(prefix="/usuarios", tags=["Usuários"])


@router.get("/me", response_model=UsuarioOut)
def get_me(current_user: Usuario = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UsuarioOut)
def update_me(
    body: UsuarioUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    for field, value in body.model_dump(exclude_none=True).items():
        if field == "senha":
            setattr(current_user, field, hash_password(value))
        else:
            setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("", response_model=list[UsuarioOut])
def list_users(
    db: Session = Depends(get_db),
    _: Usuario = Depends(require_admin),
):
    return db.query(Usuario).all()

@router.patch("/{user_id}/role", response_model=UsuarioOut)
def update_role(
    user_id: int,
    body: RoleUpdate,
    db: Session = Depends(get_db),
    _: Usuario = Depends(require_admin),
):
    user = db.get(Usuario, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    user.role = body.role
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}", response_model=MsgOut)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current: Usuario = Depends(require_admin),
):
    user = db.get(Usuario, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    if user.id_usuario == current.id_usuario:
        raise HTTPException(status_code=400, detail="Não é possível deletar sua própria conta")
    db.delete(user)
    db.commit()
    return MsgOut(detail="Usuário removido")
