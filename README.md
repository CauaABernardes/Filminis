# Filminis - Gerenciador de Filmes

Aplicação full-stack para gerenciar, classificar e compartilhar filmes. Desenvolvido como projeto avaliativo do SENAI "Roberto Mange" — Unidade curricular: Front-End / PI02.

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias](#tecnologias)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação e Setup](#instalação-e-setup)
5. [Como Rodar o Projeto](#como-rodar-o-projeto)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Endpoints da API](#endpoints-da-api)
8. [Fluxo de Autenticação](#fluxo-de-autenticação)
9. [Migrations e Banco de Dados](#migrations-e-banco-de-dados)
10. [Troubleshooting](#troubleshooting)

---

## Visão Geral

**Filminis** é uma plataforma web que permite:

- Cadastrar e consultar filmes
- Autenticação segura com JWT
- Gerenciamento de usuários com roles (user/admin)
- Sistema de destaques na home
- Filtros avançados por título, ano, categoria, ator, diretor, país
- Aprovação de filmes por admins antes de publicação

---

## Tecnologias

### Backend
| Tecnologia | Versão | Função |
|---|---|---|
| Python | 3.11+ | Linguagem principal |
| FastAPI | 0.136.1 | Framework web / REST API |
| SQLAlchemy | 2.0.49 | ORM |
| Alembic | 1.18.4 | Versionamento de schema do BD |
| MySQL | 8.0+ | Banco de dados |
| PyMySQL | 1.1.3 | Driver MySQL |
| python-jose | 3.5.0 | Geração e validação de JWT |
| passlib + bcrypt | 1.7.4 + 5.0.0 | Hash seguro de senhas |
| Pydantic v2 | 2.13.4 | Validação de dados |
| python-dotenv | 1.2.2 | Variáveis de ambiente |
| Uvicorn | 0.46.0 | Servidor ASGI |

### Frontend
| Tecnologia | Função |
|---|---|
| React 18+ | Framework UI |
| React Router | Navegação entre páginas |
| Axios / Fetch API | Requisições HTTP |
| CSS3 | Estilização |

---

## ✅ Pré-requisitos

- **Python 3.11+** e `pip`
- **MySQL 8.0+** (localmente ou em Docker)
- **Node.js 16+** e `npm` (para rodar o frontend, se necessário)
- **Git** (para clonar o repositório)

### Verificar instalação

OBS: Banco de dados é opcional devido a ter um fallback para utilização de um baco SQLLite local

```bash
# Python
python --version  # ou python3 --version

# MySQL (se instalado localmente)
mysql --version

# Node (opcional, se for usar npm)
node --version
npm --version
```

---

## Instalação e Setup

### 1. Preparar o Banco de Dados

#### Opção A: MySQL Localmente

Certifique-se de que MySQL está rodando:

```bash
# Linux/macOS
sudo systemctl status mysql

# Windows (cmd como admin)
sc query MySQL80
```

Crie o banco de dados:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE filminis;
EXIT;
```

#### Opção B: MySQL em Docker

```bash
docker run -d \
  --name filminis-db \
  -e MYSQL_ROOT_PASSWORD=senai \
  -e MYSQL_DATABASE=filminis \
  -p 3306:3306 \
  mysql:8.0
```

### 2. Clonar o Repositório

```bash
git clone https://github.com/<seu-usuario>/filminis.git
cd filminis
```

---

## Como Rodar o Projeto

### Backend (FastAPI)

#### Passo 1: Entrar na pasta do backend

```bash
cd backend  # ou simplesmente use a pasta raiz se backend e frontend estão juntos
```

#### Passo 2: Criar ambiente virtual

```bash
python -m venv .venv

# Linux / macOS
source .venv/bin/activate

# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# Windows (cmd)
.venv\Scripts\activate
```

#### Passo 3: Instalar dependências

```bash
pip install -r requirements.txt
```

#### Passo 4 (Opcional): Configurar variáveis de ambiente

Caso não Queira há um fallback que utiliza um banco de dados SQLLite local

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do MySQL:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senai
DB_NAME=filminis

SECRET_KEY=39226a7ef8fb360d091bb4fb47ed3ccfab235817c994b3a9d19abee34d9ee6f5
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

> **Dica:** Gere uma SECRET_KEY segura com: `python -c "import secrets; print(secrets.token_hex(32))"`

#### Passo 5: Aplicar Migrations do Alembic

O Alembic gerencia as mudanças no esquema do banco de dados:

```bash
# Criar tabelas iniciais
alembic upgrade head
```

Esse comando aplica todas as migrations versionadas à seu banco de dados.

**Se você modificar um model** (e.g., adicionar uma coluna), execute:

```bash
# Gerar nova migration
alembic revision --autogenerate -m "Descrição da mudança"

# Aplicar ao banco
alembic upgrade head
```

#### Passo 6: Popular o Banco (Seed)

Execute o script de população que insere dados iniciais automáticamente:

```bash
python -m app.models.population
```

Isso insere:
- 10 Países
- 13 Categorias
- 10 Linguagens  
- 13 Produtoras
- 13 Diretores
- 16 Atores
- 13 Filmes clássicos (Interestelar, LOTR, Forrest Gump, etc)
- 5 Filmes em destaque
- 2 Usuários de teste (admin e user)

**Credenciais padrão após seed:**
```
Admin:
  Email: admin@filminis.com
  Senha: admin123456

User:
  Email: user@filminis.com
  Senha: usuario123
```

Se precisar limpar e repovoar o banco:

```bash
# Limpar completamente
mysql -u root -p filminis -e "DROP DATABASE filminis; CREATE DATABASE filminis;"

# Recriar tabelas
alembic upgrade head

# Repopular com dados
python -m app.models.population
```

#### Passo 7: Rodar o Servidor Backend

```bash
uvicorn app.main:app --reload
```

O servidor estará disponível em:
- **API**: http://localhost:8000
- **Documentação Swagger**: http://localhost:8000/docs
- **Documentação ReDoc**: http://localhost:8000/redoc

---

### 🎨 Frontend (React)

#### Passo 1: Entrar na pasta do frontend

```bash
cd frontend  # ou suba um nível se estiver em backend
```

#### Passo 2: Instalar dependências

Se houver um `package.json`:

```bash
npm install
```

Se o `package.json` estiver faltando, recrie-o com as dependências básicas:

```bash
npm init -y
npm install react react-dom react-router-dom axios
npm install --save-dev vite @vitejs/plugin-react
```

#### Passo 3: Rodar o servidor frontend

```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:3000** (CRA) ou **http://localhost:5173** (Vite)

---

## Estrutura do Projeto

```
filminis/
├── app/                          # Backend - FastAPI
│   ├── main.py                   # Ponto de entrada
│   ├── alembic/                  # Migrations versionadas
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions/             # Arquivos de migration
│   │       └── 57a9ef6bf842_criando_destaques.py
│   ├── core/
│   │   ├── config.py             # Leitura de variáveis de ambiente
│   │   ├── database.py           # Conexão SQLAlchemy
│   │   └── security.py           # JWT e bcrypt
│   ├── models/
│   │   └── models.py             # Modelos ORM (tabelas)
│   ├── schemas/
│   │   └── schemas.py            # Schemas Pydantic (validação)
│   ├── routers/
│   │   ├── auth.py               # /auth/register, /auth/login
│   │   ├── filmes.py             # CRUD de filmes
│   │   ├── usuarios.py           # Gerenciamento de usuários
│   │   ├── dados.py              # Países, categorias, atores, etc
│   │   └── home.py               # /home/destaques
│   └── dependencies/
│       └── auth.py               # get_current_user, require_admin
├── src/                          # Frontend - React
│   ├── main.jsx                  # Entry point React
│   ├── App.jsx                   # Componente raiz
│   ├── pages/                    # Páginas da aplicação
│   ├── components/               # Componentes reutilizáveis
│   ├── services/                 # Serviços de API
│   ├── contexts/                 # React Context
│   ├── utils/                    # Funções utilitárias
│   └── index.css                 # Estilos globais
├── public/                       # Arquivos estáticos
│   ├── index.html
│   ├── favicon.ico
│   └── logo*.png
├── .env.example                  # Variáveis de ambiente (modelo)
├── requirements.txt              # Dependências Python
└── README.md                     # Este arquivo
```

---

## Endpoints da API

### Autenticação

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/auth/register` | Cadastra novo usuário | Pública |
| POST | `/auth/login` | Login — retorna tokens | Pública |
| POST | `/auth/refresh` | Renova access token | Pública |
| POST | `/auth/logout` | Invalida refresh token | Pública |

### Usuários

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/usuarios/me` | Perfil do usuário logado | Obrigatória |
| PATCH | `/usuarios/me` | Atualiza perfil | Obrigatória |
| GET | `/usuarios` | Lista todos os usuários | Admin |
| PATCH | `/usuarios/{id}/role` | Altera role do usuário | Admin |
| DELETE | `/usuarios/{id}` | Remove usuário | Admin |

### Filmes

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/filmes` | Lista filmes aprovados | Pública |
| GET | `/filmes/{id}` | Detalhes de um filme | Pública |
| GET | `/filmes/pendentes` | Filmes aguardando aprovação | Admin |
| POST | `/filmes` | Cadastra novo filme (pendente) | Obrigatória |
| PATCH | `/filmes/{id}` | Edita filme | Admin |
| PUT | `/filmes/{id}/aprovar` | Aprova um filme | Admin |
| DELETE | `/filmes/{id}` | Remove filme | Admin |

**Filtros em GET `/filmes`:**
- `titulo` — busca por título (case-insensitive)
- `ano` — filtra por ano
- `categoria` — filtra por ID de categoria
- `ator` — filtra por ID de ator
- `diretor` — filtra por ID de diretor
- `pais` — filtra por ID de país
- `skip` / `limit` — paginação (padrão: 0 / 20)

**Exemplo:**
```bash
curl "http://localhost:8000/filmes?titulo=batman&categoria=1&skip=0&limit=10"
```

### Dados Auxiliares

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/dados/paises` | Lista países |
| GET | `/dados/categorias` | Lista categorias |
| GET | `/dados/linguagens` | Lista linguagens |
| GET | `/dados/produtoras` | Lista produtoras |
| GET | `/dados/atores` | Lista atores |
| GET | `/dados/diretores` | Lista diretores |

### Home / Destaques

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/home/destaques` | Lista filmes em destaque | 
| PUT | `/home/destaques` | Define destaques | Admin |
| DELETE | `/home/destaques` | Remove todos destaques | Admin |

**Exemplo - Definir destaques:**
```bash
curl -X PUT http://localhost:8000/home/destaques \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ids_filmes": [3, 7, 1, 12]}'
```

---

## Fluxo de Autenticação

```
1. POST /auth/register
   ├─ Cria novo usuário com role = "user"
   └─ Senha armazenada com bcrypt

2. POST /auth/login
   ├─ Valida email e senha
   └─ Retorna {access_token, refresh_token, token_type}

3. Requisições Autenticadas
   ├─ Header: Authorization: Bearer <access_token>
   └─ Token expira em 30 minutos (configurável)

4. POST /auth/refresh (quando token expirar)
   ├─ Envie o refresh_token
   └─ Receba novo access_token

5. POST /auth/logout
   ├─ Invalida o refresh_token (blacklist)
   └─ Logout completo
```

**Tokens:**
- **Access Token**: Expira em 30 minutos
- **Refresh Token**: Expira em 7 dias

---

## 🗄️ Migrations e Banco de Dados

### Fluxo do Alembic

O **Alembic** versioniza as mudanças no seu schema de BD. Cada alteração no models gera um arquivo de migration.

#### 1. Criar uma nova migration

Após modificar um model em `app/models/models.py`:

```bash
alembic revision --autogenerate -m "Adicionar campo novo na tabela usuario"
```

Isso gera um novo arquivo em `app/alembic/versions/`.

#### 2. Revisar a migration (importante!)

Abra o arquivo gerado e verifique se as mudanças estão corretas. O `--autogenerate` é automático e pode ter erros.

```python
# app/alembic/versions/abc123_adicionar_campo.py
def upgrade():
    op.add_column('usuario', sa.Column('novo_campo', sa.String(100), nullable=True))

def downgrade():
    op.drop_column('usuario', 'novo_campo')
```

#### 3. Aplicar a migration

```bash
alembic upgrade head
```

#### 4. Reverter a última migration (se necessário)

```bash
alembic downgrade -1
```

#### 5. Ver histórico de migrations

```bash
alembic history
alembic current
```

---

## 🎯 Regras de Negócio

- Qualquer usuário autenticado pode cadastrar filmes (ficam pendentes)
- Apenas **admins** podem aprovar, editar e deletar filmes
- Apenas **admins** podem deletar usuários e alterar roles
- Senhas são sempre armazenadas com **bcrypt** (nunca em texto puro)

---

## 👨‍💼 Criando o Primeiro Admin

Após rodar o projeto e populá-lo, crie um usuário comum pela API:

e com o admin já pre cadastrado altere a role dele

---

## 📝 Exemplos de Requisições

### 1. Registrar Novo Usuário

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "nome": "João Silva",
    "senha": "SenhaForte123"
  }'
```

### 2. Fazer Login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@filminis.com", "senha": "senai123"}'

# Resposta:
# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "token_type": "bearer"
# }
```

### 3. Listar Filmes (Público)

```bash
curl http://localhost:8000/filmes
```

### 4. Buscar Filmes por Título

```bash
curl "http://localhost:8000/filmes?titulo=batman&skip=0&limit=10"
```

### 5. Cadastrar Novo Filme (Autenticado)

```bash
curl -X POST http://localhost:8000/filmes \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Novo Filme Incrível",
    "ano": 2025,
    "duracao": "02:15",
    "sinopse": "Uma história emocionante que te prenderá.",
    "ids_categorias": [1, 2]
  }'
```

### 6. Aprovar um Filme (Admin)

```bash
curl -X PUT http://localhost:8000/filmes/5/aprovar \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json"
```

### 7. Obter Perfil do Usuário (Autenticado)

```bash
curl http://localhost:8000/usuarios/me \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

---

## 🆘 Troubleshooting

### Erro: "Connection refused" ao conectar no MySQL

**Solução:**
- Verifique se MySQL está rodando: `sudo systemctl start mysql`
- Ou use Docker: `docker start filminis-db`
- Verifique credenciais no `.env`

### Erro: "ModuleNotFoundError: No module named 'app'"

**Solução:**
```bash
# Certifique-se de estar na pasta raiz (onde está app/)
cd /caminho/para/filminis
source .venv/bin/activate
pip install -r requirements.txt
```

### Erro: "Alembic command not found"

**Solução:**
```bash
pip install alembic
# Ou reinstale as dependências
pip install -r requirements.txt
```

### Erro: "CORS error" no frontend

**Solução:**
Verifique o CORS no backend (`app/main.py`):
```python
allow_origins=["http://localhost:3000"]  # Adicione seu frontend aqui
```

### Porta 8000 ou 3000 já em uso

**Solução:**
```bash
# Backend em porta diferente
uvicorn app.main:app --reload --port 8001

# Frontend (Vite)
npm run dev -- --port 3001
```

## 📄 Licença

Projeto desenvolvido como atividade avaliativa do SENAI "Roberto Mange".

---

## ✨ Desenvolvido com lágrimas e suor

**Filminis API** — Gerenciador de Filmes | SENAI PI02 | 2024/2025