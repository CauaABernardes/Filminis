from sqlalchemy import (
    Boolean, Column, Date, DateTime, Enum, ForeignKey,
    Integer, Numeric, String, Text, Time, func, create_engine
)
from sqlalchemy.orm import relationship, sessionmaker

from app.core.database import Base, engine


# ─── Tabelas auxiliares ───────────────────────────────────────────────────────

class Pais(Base):
    __tablename__ = "pais"
    id_pais = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False, unique=True)


class Linguagem(Base):
    __tablename__ = "linguagem"
    id_linguagem = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False, unique=True)


class Categoria(Base):
    __tablename__ = "categoria"
    id_categoria = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False, unique=True)


class Produtora(Base):
    __tablename__ = "produtora"
    id_produtora = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False, unique=True)


# ─── Pessoas ──────────────────────────────────────────────────────────────────

class Ator(Base):
    __tablename__ = "ator"
    id_ator = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False, unique=True)
    sobrenome = Column(String(255), nullable=False)
    paises = relationship("Pais", secondary="ator_pais", viewonly=True)


class Diretor(Base):
    __tablename__ = "diretor"
    id_diretor = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False, unique=True)
    sobrenome = Column(String(255), nullable=False)
    paises = relationship("Pais", secondary="diretor_pais", viewonly=True)


# ─── Tabelas de relacionamento N:N para pessoas ───────────────────────────────

class AtorPais(Base):
    __tablename__ = "ator_pais"
    id_ator_pais = Column(Integer, primary_key=True, autoincrement=True)
    id_ator = Column(Integer, ForeignKey("ator.id_ator"), nullable=False)
    id_pais = Column(Integer, ForeignKey("pais.id_pais"), nullable=False)


class DiretorPais(Base):
    __tablename__ = "diretor_pais"
    id_diretor_pais = Column(Integer, primary_key=True, autoincrement=True)
    id_pais = Column(Integer, ForeignKey("pais.id_pais"), nullable=False)
    id_diretor = Column(Integer, ForeignKey("diretor.id_diretor"), nullable=False)


class ProdutoraPais(Base):
    __tablename__ = "produtora_pais"
    id_produtora_pais = Column(Integer, primary_key=True, autoincrement=True)
    id_produtora = Column(Integer, ForeignKey("produtora.id_produtora"), nullable=False)
    id_pais = Column(Integer, ForeignKey("pais.id_pais"), nullable=False)


# ─── Filme e relacionamentos ──────────────────────────────────────────────────

class Filme(Base):
    __tablename__ = "filme"
    id_filme = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(255), nullable=False, unique=True)
    id_produtora_principal = Column(Integer, ForeignKey("produtora.id_produtora"))
    id_pais_origem = Column(Integer, ForeignKey("pais.id_pais"), nullable=False)
    orcamento = Column(Numeric(15, 2))
    duracao = Column(Time)
    sinopse = Column(Text, unique=True)
    ano = Column(Integer)
    poster = Column(String(255), unique=True)
    banner = Column(String(255), unique=True)
    trailer = Column(String(255), unique=True)
    # flag: True = aprovado, False = pendente
    flag = Column(Boolean, default=False)

    produtora_principal = relationship("Produtora")
    pais_origem = relationship("Pais", foreign_keys=[id_pais_origem])
    produtoras = relationship("Produtora", secondary="filme_produtora", viewonly=True)
    paises = relationship("Pais", secondary="filme_pais", viewonly=True)
    categorias = relationship("Categoria", secondary="filme_categoria", viewonly=True)
    atores = relationship("Ator", secondary="filme_ator", viewonly=True)
    diretores = relationship("Diretor", secondary="filme_diretor", viewonly=True)
    linguagens = relationship("Linguagem", secondary="filme_linguagem", viewonly=True)


class FilmeProdutora(Base):
    __tablename__ = "filme_produtora"
    id_filme_produtora = Column(Integer, primary_key=True, autoincrement=True)
    id_filme = Column(Integer, ForeignKey("filme.id_filme"), nullable=False)
    id_produtora = Column(Integer, ForeignKey("produtora.id_produtora"), nullable=False)


class FilmePais(Base):
    __tablename__ = "filme_pais"
    id_filme_pais = Column(Integer, primary_key=True, autoincrement=True)
    id_filme = Column(Integer, ForeignKey("filme.id_filme"), nullable=False)
    id_pais = Column(Integer, ForeignKey("pais.id_pais"), nullable=False)


class FilmeCategoria(Base):
    __tablename__ = "filme_categoria"
    id_filme_categoria = Column(Integer, primary_key=True, autoincrement=True)
    id_filme = Column(Integer, ForeignKey("filme.id_filme"), nullable=False)
    id_categoria = Column(Integer, ForeignKey("categoria.id_categoria"), nullable=False)


class FilmeAtor(Base):
    __tablename__ = "filme_ator"
    id_filme_ator = Column(Integer, primary_key=True, autoincrement=True)
    id_filme = Column(Integer, ForeignKey("filme.id_filme"), nullable=False)
    id_ator = Column(Integer, ForeignKey("ator.id_ator"), nullable=False)


class FilmeDiretor(Base):
    __tablename__ = "filme_diretor"
    id_filme_diretor = Column(Integer, primary_key=True, autoincrement=True)
    id_filme = Column(Integer, ForeignKey("filme.id_filme"), nullable=False)
    id_diretor = Column(Integer, ForeignKey("diretor.id_diretor"), nullable=False)


class FilmeLinguagem(Base):
    __tablename__ = "filme_linguagem"
    id_filme_linguagem = Column(Integer, primary_key=True, autoincrement=True)
    id_filme = Column(Integer, ForeignKey("filme.id_filme"), nullable=False)
    id_linguagem = Column(Integer, ForeignKey("linguagem.id_linguagem"), nullable=False)


# ─── Usuário ──────────────────────────────────────────────────────────────────

class Usuario(Base):
    __tablename__ = "usuario"
    id_usuario = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
    sobrenome = Column(String(255))
    apelido = Column(String(100), unique=True)
    email = Column(String(255), nullable=False, unique=True)
    senha = Column(String(255), nullable=False)
    data_nascimento = Column(Date)
    imagem = Column(String(500))
    role = Column(Enum("admin", "user"), nullable=False, default="user")
    data_criacao = Column(DateTime, default=func.now())


# ─── Destaques da Home ────────────────────────────────────────────────────────

class DestaqueHome(Base):
    __tablename__ = "destaque_home"
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_filme = Column(Integer, ForeignKey("filme.id_filme"), nullable=False, unique=True)
    ordem = Column(Integer, nullable=False, default=0)
    filme = relationship("Filme")


# ─── Refresh token blacklist ──────────────────────────────────────────────────

class RefreshTokenBlacklist(Base):
    __tablename__ = "refresh_token_blacklist"
    id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String(512), nullable=False, unique=True)
    criado_em = Column(DateTime, default=func.now())


Base.metadata.create_all(bind=engine)
