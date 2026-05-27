from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.models import models  # garante que os models sejam registrados
from app.routers import auth, dados, filmes, home, usuarios

# Cria tabelas que ainda não existem (não altera as existentes)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Filminis API",
    description="Backend do gerenciador de filmes Filminis — SENAI",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Em produção, liste somente o domínio do front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(filmes.router)
app.include_router(dados.router)
app.include_router(home.router)


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "Filminis API está no ar 🎬"}