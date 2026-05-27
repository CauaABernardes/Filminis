from __future__ import annotations

from datetime import date, datetime, time
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, EmailStr, field_validator


# ─── Auxiliares simples ───────────────────────────────────────────────────────

class IdNome(BaseModel):
    model_config = {"from_attributes": True}
    id: int
    nome: str

class PaisOut(BaseModel):
    model_config = {"from_attributes": True}
    id_pais: int
    nome: str

class GeneroOut(BaseModel):
    model_config = {"from_attributes": True}
    id_genero: int
    nome: str

class LinguagemOut(BaseModel):
    model_config = {"from_attributes": True}
    id_linguagem: int
    nome: str

class CategoriaOut(BaseModel):
    model_config = {"from_attributes": True}
    id_categoria: int
    nome: str

class ProdutoraOut(BaseModel):
    model_config = {"from_attributes": True}
    id_produtora: int
    nome: str

# ─── Ator / Diretor ───────────────────────────────────────────────────────────

class AtorOut(BaseModel):
    model_config = {"from_attributes": True}
    id_ator: int
    nome: str
    sobrenome: str

class DiretorOut(BaseModel):
    model_config = {"from_attributes": True}
    id_diretor: int
    nome: str
    sobrenome: str

# ─── Filme ────────────────────────────────────────────────────────────────────

class FilmeBase(BaseModel):
    titulo: str
    orcamento: Optional[Decimal] = None
    duracao: Optional[str] = None          # "HH:MM" ou "HH:MM:SS"
    sinopse: Optional[str] = None
    ano: Optional[int] = None
    poster: Optional[str] = None
    banner: Optional[str] = None
    trailer: Optional[str] = None

class FilmeCreate(FilmeBase):
    id_produtora_principal: Optional[int] = None
    id_pais_origem: Optional[int] = None
    ids_produtoras: List[int] = []
    ids_paises: List[int] = []
    ids_categorias: List[int] = []
    ids_atores: List[int] = []
    ids_diretores: List[int] = []
    ids_linguagens: List[int] = []

class FilmeUpdate(BaseModel):
    """Todos os campos opcionais para PATCH."""
    titulo: Optional[str] = None
    orcamento: Optional[Decimal] = None
    duracao: Optional[str] = None
    sinopse: Optional[str] = None
    ano: Optional[int] = None
    poster: Optional[str] = None
    banner: Optional[str] = None
    trailer: Optional[str] = None
    id_produtora_principal: Optional[int] = None
    id_pais_origem: Optional[int] = None
    ids_produtoras: Optional[List[int]] = None
    ids_paises: Optional[List[int]] = None
    ids_categorias: Optional[List[int]] = None
    ids_atores: Optional[List[int]] = None
    ids_diretores: Optional[List[int]] = None
    ids_linguagens: Optional[List[int]] = None

class FilmeOut(BaseModel):
    model_config = {"from_attributes": True}
    id_filme: int
    titulo: str
    orcamento: Optional[Decimal]
    duracao: Optional[time]
    sinopse: Optional[str]
    ano: Optional[int]
    poster: Optional[str]
    banner: Optional[str]
    trailer: Optional[str]
    flag: Optional[bool]
    pais_origem: Optional[PaisOut] = None
    produtoras: List[ProdutoraOut] = []
    paises: List[PaisOut] = []
    categorias: List[CategoriaOut] = []
    atores: List[AtorOut] = []
    diretores: List[DiretorOut] = []
    linguagens: List[LinguagemOut] = []

class FilmeListOut(BaseModel):
    """Versão resumida para listagem."""
    model_config = {"from_attributes": True}
    id_filme: int
    titulo: str
    ano: Optional[int]
    poster: Optional[str]
    flag: Optional[bool]
    pais_origem: Optional[PaisOut] = None
    categorias: List[CategoriaOut] = []

# ─── Usuário ──────────────────────────────────────────────────────────────────

class UsuarioCreate(BaseModel):
    nome: str
    sobrenome: Optional[str] = None
    apelido: Optional[str] = None
    email: EmailStr
    senha: str
    data_nascimento: Optional[date] = None
    imagem: Optional[str] = None

    @field_validator("senha")
    @classmethod
    def senha_minima(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Senha deve ter ao menos 6 caracteres")
        return v

class UsuarioUpdate(BaseModel):
    nome: Optional[str] = None
    sobrenome: Optional[str] = None
    apelido: Optional[str] = None
    data_nascimento: Optional[date] = None
    imagem: Optional[str] = None
    senha: Optional[str] = None

class UsuarioOut(BaseModel):
    model_config = {"from_attributes": True}
    id_usuario: int
    nome: str
    sobrenome: Optional[str]
    apelido: Optional[str]
    email: str
    imagem: Optional[str]
    role: str
    data_criacao: Optional[datetime]


class RoleUpdate(BaseModel):
    role: str

    @field_validator("role")
    @classmethod
    def role_valida(cls, v: str) -> str:
        if v not in ("admin", "user"):
            raise ValueError("role deve ser 'admin' ou 'user'")
        return v

# ─── Auth ─────────────────────────────────────────────────────────────────────

class LoginIn(BaseModel):
    email: EmailStr
    senha: str

class TokenOut(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class RefreshIn(BaseModel):
    refresh_token: str


# ─── Destaques da Home ────────────────────────────────────────────────────────

class DestaqueHomeOut(BaseModel):
    model_config = {"from_attributes": True}
    id: int
    ordem: int
    filme: FilmeListOut

class DestaqueHomeSet(BaseModel):
    """Lista ordenada de ids de filmes para salvar como destaques."""
    ids_filmes: List[int]


class MsgOut(BaseModel):
    detail: str