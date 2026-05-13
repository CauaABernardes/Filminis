from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import Ator, Categoria, Diretor, Linguagem, Pais, Produtora
from app.schemas.schemas import AtorOut, CategoriaOut, DiretorOut, LinguagemOut, PaisOut, ProdutoraOut

router = APIRouter(prefix="/dados", tags=["Dados auxiliares"])

@router.get("/paises", response_model=list[PaisOut])
def get_paises(db: Session = Depends(get_db)):
    return db.query(Pais).order_by(Pais.nome).all()

@router.get("/categorias", response_model=list[CategoriaOut])
def get_categorias(db: Session = Depends(get_db)):
    return db.query(Categoria).order_by(Categoria.nome).all()

@router.get("/linguagens", response_model=list[LinguagemOut])
def get_linguagens(db: Session = Depends(get_db)):
    return db.query(Linguagem).order_by(Linguagem.nome).all()

@router.get("/produtoras", response_model=list[ProdutoraOut])
def get_produtoras(db: Session = Depends(get_db)):
    return db.query(Produtora).order_by(Produtora.nome).all()

@router.get("/atores", response_model=list[AtorOut])
def get_atores(db: Session = Depends(get_db)):
    return db.query(Ator).order_by(Ator.sobrenome).all()

@router.get("/diretores", response_model=list[DiretorOut])
def get_diretores(db: Session = Depends(get_db)):
    return db.query(Diretor).order_by(Diretor.sobrenome).all()
