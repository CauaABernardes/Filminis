# 🎬 Filminis API

Backend do gerenciador de filmes **Filminis**, desenvolvido como projeto avaliativo do SENAI "Roberto Mange" — Unidade curricular: Front-End / PI02.

---

## Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| Python | 3.11+ | Linguagem principal |
| FastAPI | 0.136.1 | Framework web / REST API |
| SQLAlchemy | 2.0.49 | ORM |
| Alembic | 1.18.4 | Migrations de banco de dados |
| MySQL | 8.0+ | Banco de dados |
| PyMySQL | 1.1.3 | Driver MySQL para Python |
| python-jose | 3.5.0 | Geração e validação de JWT |
| passlib + bcrypt | 1.7.4 + 5.0.0 | Hash seguro de senhas |
| Pydantic v2 | 2.13.4 | Validação de dados / schemas |
| python-dotenv | 1.2.2 | Leitura do arquivo `.env` |
| Uvicorn | 0.46.0 | Servidor ASGI |

---

## Pré-requisitos

- Python 3.11 ou superior
- MySQL 8.0 rodando localmente (ou em Docker)
- `pip` atualizado

---

## Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/<seu-usuario>/filminis.git
cd filminis
cd backend
```

### 2. Crie e ative um ambiente virtual

```bash
python -m venv .venv

# Linux / macOS
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure o banco de dados

Crie o banco e rode o script SQL:

```bash
mysql -u root -p < filminis-DDL-DML.sql
```

### 5. Configure as variáveis de ambiente

Copie o arquivo de exemplo e edite com seus dados:

```bash
cp .venv.example .venv
```

Edite o `.venv`:

```venv
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=filminis

SECRET_KEY=troque_por_uma_chave_longa_e_aleatoria
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

> **Dica:** gere uma SECRET_KEY segura com `python -c "import secrets; print(secrets.token_hex(32))"`

### 6. Rode o servidor

```bash
uvicorn app.main:app --reload
```

A API estará disponível em: **http://localhost:8000**

Documentação interativa (Swagger): **http://localhost:8000/docs**

---

### 7. Atualizando o banco com Alembic

Com o Alembic já configurado, use os comandos abaixo sempre que alterar os models:

**Gerar uma nova migration (detecta alterações automaticamente):**

```bash
alembic revision --autogenerate -m "descricao_da_alteracao"
```

**Aplicar as migrations pendentes ao banco:**

```bash
alembic upgrade head
```

**Outros comandos úteis:**

```bash
# Ver o histórico de migrations
alembic history

# Ver qual migration está aplicada atualmente
alembic current

# Reverter a última migration
alembic downgrade -1
```

> **Importante:** o `--autogenerate` apenas *gera* o arquivo de migration — ele não altera o banco. Sempre rode `alembic upgrade head` depois para aplicar as mudanças.

## Estrutura do projeto

```
filminis-back/
├── app/
│   ├── main.py                  # Ponto de entrada da aplicação
│   ├── alembic.ini              # Configuração do Alembic
│   ├── alembic/
│   │   ├── env.py               # Ambiente de migrations
│   │   └── versions/            # Arquivos de migration gerados
│   ├── core/
│   │   ├── config.py            # Configurações (env vars)
│   │   ├── database.py          # Conexão SQLAlchemy + get_db
│   │   └── security.py          # JWT e bcrypt
│   ├── models/
│   │   └── models.py            # Modelos ORM (tabelas)
│   ├── schemas/
│   │   └── schemas.py           # Schemas Pydantic (request/response)
│   ├── routers/
│   │   ├── auth.py              # /auth/register, /auth/login, /auth/refresh, /auth/logout
│   │   ├── filmes.py            # CRUD de filmes
│   │   ├── home.py              # /home/destaques — destaques da página inicial
│   │   ├── usuarios.py          # Perfil e administração de usuários
│   │   └── dados.py             # Dados auxiliares (países, categorias, atores...)
│   └── dependencies/
│       └── auth.py              # get_current_user, require_admin
├── filminis-DDL-DML.sql         # Script para criar e popular o banco
├── .env.example                 # Variáveis de ambiente (modelo)
├── requirements.txt
└── README.md
```

---

## Endpoints

### Autenticação

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/auth/register` | Cadastra novo usuário | Público |
| POST | `/auth/login` | Login — retorna access + refresh token | Público |
| POST | `/auth/refresh` | Renova o access token | Público |
| POST | `/auth/logout` | Invalida o refresh token | Público |

### Usuários

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/usuarios/me` | Perfil do usuário logado | Autenticado |
| PATCH | `/usuarios/me` | Atualiza perfil | Autenticado |
| GET | `/usuarios` | Lista todos os usuários | Admin |
| PATCH | `/usuarios/{id}/role` | Altera role do usuário | Admin |
| DELETE | `/usuarios/{id}` | Remove usuário | Admin |

### Filmes

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/filmes` | Lista filmes aprovados com filtros | Público |
| GET | `/filmes/{id}` | Detalhes de um filme | Público |
| GET | `/filmes/pendentes` | Lista filmes aguardando aprovação | Admin |
| POST | `/filmes` | Cadastra novo filme (fica pendente) | Autenticado |
| PATCH | `/filmes/{id}` | Edita filme parcialmente | Admin |
| PUT | `/filmes/{id}/aprovar` | Aprova um filme pendente | Admin |
| DELETE | `/filmes/{id}` | Remove filme | Admin |

**Filtros disponíveis em GET `/filmes`:**
- `titulo` — busca por parte do título (case-insensitive)
- `ano` — filtra por ano
- `categoria` — filtra por `id_categoria`
- `ator` — filtra por `id_ator`
- `diretor` — filtra por `id_diretor`
- `pais` — filtra por `id_pais`
- `skip` / `limit` — paginação (padrão: 0 / 20)

### Dados auxiliares

| Método | Rota | Descrição |
|---|---|---|
| GET | `/dados/paises` | Lista países |
| GET | `/dados/categorias` | Lista categorias/gêneros |
| GET | `/dados/linguagens` | Lista linguagens |
| GET | `/dados/produtoras` | Lista produtoras |
| GET | `/dados/atores` | Lista atores |
| GET | `/dados/diretores` | Lista diretores |

### Home / Destaques

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/home/destaques` | Lista os filmes em destaque ordenados | Público |
| PUT | `/home/destaques` | Substitui todos os destaques pela lista enviada | Admin |
| DELETE | `/home/destaques` | Remove todos os destaques | Admin |

**Body de PUT `/home/destaques`:**
```json
{
  "ids_filmes": [3, 7, 1, 12]
}
```
> A ordem dos IDs define a ordem de exibição. Todos os IDs devem corresponder a filmes existentes.

---

## Fluxo de autenticação

```
1. POST /auth/register  →  cria conta (role = "user")
2. POST /auth/login     →  recebe access_token + refresh_token
3. Requisições autenticadas → Header: Authorization: Bearer <access_token>
4. POST /auth/refresh   →  quando access_token expirar, envie o refresh_token
5. POST /auth/logout    →  invalida o refresh_token (blacklist)
```

O access token expira em **30 minutos** (configurável).  
O refresh token expira em **7 dias** (configurável).

---

## Regras de negócio

- Qualquer usuário autenticado pode **cadastrar filmes**, mas eles ficam com `flag = false` (pendentes).
- Apenas **admins** podem **aprovar**, **editar** e **deletar** filmes.
- Apenas **admins** podem **deletar usuários** e **alterar roles**.
- A senha do usuário é armazenada com **bcrypt** (nunca em texto puro ou SHA2).

---

## Criando o primeiro admin

Após rodar o projeto, crie um usuário comum pela API e depois altere sua role direto no banco:

```sql
UPDATE usuario SET role = 'admin' WHERE email = 'seu@email.com';
```

Ou, se já houver outro admin, use o endpoint `PATCH /usuarios/{id}/role`.

---

## Exemplo de requisição

```bash
# 1. Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@filminis.com","senha":"admin123"}'

# 2. Listar filmes (público)
curl http://localhost:8000/filmes

# 3. Buscar por título
curl "http://localhost:8000/filmes?titulo=batman"

# 4. Cadastrar filme (autenticado)
curl -X POST http://localhost:8000/filmes \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Novo Filme",
    "ano": 2025,
    "duracao": "02:00",
    "sinopse": "Uma história incrível.",
    "ids_categorias": [1, 2]
  }'
```
