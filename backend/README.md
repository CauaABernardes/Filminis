# Filminis API

Backend do gerenciador de filmes **Filminis**, desenvolvido como projeto avaliativo do SENAI "Roberto Mange".

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

### 7. Popular o banco de dados (Opcional)

Para popular o banco com dados iniciais (categorias, países, atores, filmes, etc.), execute:

```bash
python -m app.models.population
```

**O que este comando insere:**

- **10 Países**: Estados Unidos, Brasil, Japão, Coreia do Sul, Reino Unido, França, Alemanha, Canadá, Austrália, Nova Zelândia
- **10 Idiomas**: Inglês, Português, Japonês, Coreano, Francês, Alemão, Espanhol, Italiano, Mandarim, Russo
- **13 Categorias/Gêneros**: Ação, Aventura, Ficção Científica, Drama, Terror, Animação, Comédia, Romance, Super-herói, Crime, Suspense, Musical, Fantasia
- **13 Produtoras**: Warner Bros, Universal Pictures, Marvel Studios, 20th Century Studios, Columbia Pictures, Studio Ghibli, Toho, A24, Legendary Pictures, Netflix Studios, Summit Entertainment, DC Studios, Paramount Pictures
- **13 Diretores**: Christopher Nolan, Peter Jackson, Robert Zemeckis, Stanley Kubrick, Hayao Miyazaki, Todd Phillips, James Cameron, Jon Favreau, Quentin Tarantino, Bong Joon-ho, George Miller, Damien Chazelle, Matt Reeves
- **16 Atores**: Matthew McConaughey, Anne Hathaway, Elijah Wood, Tom Hanks, Jack Nicholson, Yoji Matsuda, Bradley Cooper, Leonardo DiCaprio, Robert Downey Jr., John Travolta, Song Kang-ho, Tom Hardy, Ryan Gosling, Emma Stone, Scarlett Johansson, Robert Pattinson
- **13 Filmes com relacionamentos completos**: Interestelar, O Senhor dos Anéis, Forrest Gump, O Iluminado, Princesa Mononoke, Se Beber Não Case, Titanic, Homem de Ferro, Pulp Fiction, Parasita, Mad Max Fúria de Estrada, La La Land, The Batman
- **2 Usuários de teste**:
  - Admin: `admin@filminis.com` / `admn123456`
  - User: `user@filminis.com` / `usuario123`
- **5 Destaques** para a página inicial em ordem específica

> ⚠️ Importante: Este comando deve ser executado apenas uma vez, após criar as tabelas do banco.

---

### 8. Fallback de emergência — SQLite

**Se você não tiver um banco MySQL configurado**, a aplicação usará automaticamente um banco SQLite de fallback (`filminis_fallback.db`). Isso permite que você:

- Teste a aplicação localmente sem instalar MySQL
- Desenvolva offline
- Use em ambientes com recursos limitados

**Como o fallback funciona:**

1. A aplicação tenta conectar ao MySQL usando as variáveis de ambiente (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, etc.)
2. Se a conexão falhar, ativa automaticamente o banco SQLite em `filminis_fallback.db`
3. As tabelas são criadas automaticamente
4. Você pode popuar o banco executando: `python -m app.models.population`

> **Nota:** O SQLite é **apenas para desenvolvimento/testes**. Para produção, sempre use MySQL ou PostgreSQL.

---

### 9. Atualizando o banco com Alembic

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

## Modelos de Dados

A aplicação utiliza os seguintes modelos SQLAlchemy (ORM):

### **Tabelas Principais**

#### 1. **Usuario** 
Armazena informações dos usuários do sistema.

```python
- id_usuario: Integer (PK) — Identificador único
- nome: String(255) — Nome do usuário
- sobrenome: String(255) — Sobrenome
- apelido: String(100) — Nome único (UNIQUE)
- email: String(255) — Email único (UNIQUE)
- senha: String(255) — Hash bcrypt
- data_nascimento: Date — Data de nascimento (opcional)
- imagem: String(500) — URL da foto de perfil (opcional)
- role: Enum("admin", "user") — Nível de acesso (padrão: "user")
- data_criacao: DateTime — Timestamp de criação (automático)
```

#### 2. **Filme**
Armazena informações dos filmes cadastrados.

```python
- id_filme: Integer (PK) — Identificador único
- titulo: String(255) — Título do filme (UNIQUE)
- id_produtora_principal: Integer (FK) — Produtora principal
- id_pais_origem: Integer (FK) — País de origem
- orcamento: Numeric(15,2) — Orçamento em dólares
- duracao: Time — Duração (formato HH:MM:SS)
- sinopse: Text — Descrição longa do filme (UNIQUE)
- ano: Integer — Ano de lançamento
- poster: String(255) — URL do cartaz (UNIQUE)
- banner: String(255) — URL do banner (UNIQUE)
- trailer: String(255) — URL do trailer (UNIQUE)
- flag: Boolean — Status: True=aprovado, False=pendente (padrão: False)

Relacionamentos:
- produtora_principal: Produtora
- pais_origem: Pais
- produtoras: List[Produtora] (many-to-many via filme_produtora)
- paises: List[Pais] (many-to-many via filme_pais)
- categorias: List[Categoria] (many-to-many via filme_categoria)
- atores: List[Ator] (many-to-many via filme_ator)
- diretores: List[Diretor] (many-to-many via filme_diretor)
- linguagens: List[Linguagem] (many-to-many via filme_linguagem)
```

#### 3. **Pais**
Dados de países (para origem de filmes, atores, diretores, etc).

```python
- id_pais: Integer (PK)
- nome: String(255) — Nome do país (UNIQUE)
```

#### 4. **Linguagem**
Idiomas disponíveis para filmes.

```python
- id_linguagem: Integer (PK)
- nome: String(255) — Nome do idioma (UNIQUE)
```

#### 5. **Categoria**
Gêneros/categorias de filmes.

```python
- id_categoria: Integer (PK)
- nome: String(255) — Nome da categoria (UNIQUE, ex: "Ação", "Drama")
```

#### 6. **Produtora**
Estúdios e produtoras de cinema.

```python
- id_produtora: Integer (PK)
- nome: String(255) — Nome da produtora (UNIQUE)
```

#### 7. **Ator**
Elenco de filmes.

```python
- id_ator: Integer (PK)
- nome: String(255) — Primeiro nome
- sobrenome: String(255) — Sobrenome
- paises: List[Pais] (many-to-many via ator_pais)
```

#### 8. **Diretor**
Diretores de filmes.

```python
- id_diretor: Integer (PK)
- nome: String(255) — Primeiro nome
- sobrenome: String(255) — Sobrenome
- paises: List[Pais] (many-to-many via diretor_pais)
```

#### 9. **DestaqueHome**
Filmes em destaque na página inicial (com ordem).

```python
- id: Integer (PK)
- id_filme: Integer (FK) — Referência ao filme (UNIQUE)
- ordem: Integer — Ordem de exibição
- filme: Filme — Relacionamento com filme
```

#### 10. **RefreshTokenBlacklist**
Lista de refresh tokens invalidados (logout).

```python
- id: Integer (PK)
- token: String(512) — Token JWT (UNIQUE)
- criado_em: DateTime — Timestamp da invalidação (automático)
```

### **Tabelas de Relacionamento** (Many-to-Many)

Todas as tabelas a seguir são tabelas de junção para relacionamentos muitos-para-muitos:

| Tabela | Relaciona | ID PK |
|--------|-----------|-------|
| `filme_produtora` | Filme ↔ Produtora | id_filme_produtora |
| `filme_pais` | Filme ↔ Pais | id_filme_pais |
| `filme_categoria` | Filme ↔ Categoria | id_filme_categoria |
| `filme_ator` | Filme ↔ Ator | id_filme_ator |
| `filme_diretor` | Filme ↔ Diretor | id_filme_diretor |
| `filme_linguagem` | Filme ↔ Linguagem | id_filme_linguagem |
| `ator_pais` | Ator ↔ Pais | id_ator_pais |
| `diretor_pais` | Diretor ↔ Pais | id_diretor_pais |
| `produtora_pais` | Produtora ↔ Pais | id_produtora_pais |

---

## Documentação Completa da API

### Autenticação — `/auth`

#### **POST** `/auth/register`
Registra um novo usuário na plataforma.

**Request:**
```json
{
  "nome": "João",
  "sobrenome": "Silva",
  "apelido": "joao_silva",
  "email": "joao@example.com",
  "senha": "SenhaForte123!"
}
```

**Response (201 Created):**
```json
{
  "id_usuario": 5,
  "nome": "João",
  "sobrenome": "Silva",
  "apelido": "joao_silva",
  "email": "joao@example.com",
  "role": "user",
  "data_criacao": "2025-06-11T14:30:00"
}
```

---

#### **POST** `/auth/login`
Realiza login e retorna tokens de acesso.

**Request:**
```json
{
  "email": "admin@filminis.com",
  "senha": "admin123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "usuario": {
    "id_usuario": 1,
    "nome": "Administrador",
    "email": "admin@filminis.com",
    "role": "admin"
  }
}
```

**Headers para requisições autenticadas:**
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

#### **POST** `/auth/refresh`
Renova o access token usando o refresh token.

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

#### **POST** `/auth/logout`
Invalida o refresh token (adiciona à blacklist).

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "mensagem": "Logout realizado com sucesso"
}
```

---

### Usuários — `/usuarios`

#### **GET** `/usuarios/me`
Retorna os dados do usuário autenticado.

**Auth:** Obrigatório

**Response (200 OK):**
```json
{
  "id_usuario": 3,
  "nome": "Usuário",
  "sobrenome": "Teste",
  "apelido": "user",
  "email": "user@filminis.com",
  "role": "user",
  "data_nascimento": null,
  "imagem": null,
  "data_criacao": "2025-06-11T10:00:00"
}
```

---

#### **PATCH** `/usuarios/me`
Atualiza dados do perfil do usuário logado.

**Auth:** Obrigatório

**Request:**
```json
{
  "nome": "João",
  "sobrenome": "da Silva",
  "data_nascimento": "1990-05-15",
  "imagem": "https://example.com/avatar.jpg"
}
```

**Response (200 OK):**
```json
{
  "id_usuario": 3,
  "nome": "João",
  "sobrenome": "da Silva",
  "apelido": "user",
  "email": "user@filminis.com",
  "role": "user",
  "data_nascimento": "1990-05-15",
  "imagem": "https://example.com/avatar.jpg",
  "data_criacao": "2025-06-11T10:00:00"
}
```

---

#### **GET** `/usuarios`
Lista todos os usuários do sistema.

**Auth:** Obrigatório | Role: **admin** apenas

**Response (200 OK):**
```json
[
  {
    "id_usuario": 1,
    "nome": "Administrador",
    "email": "admin@filminis.com",
    "role": "admin",
    "data_criacao": "2025-06-11T09:00:00"
  },
  {
    "id_usuario": 3,
    "nome": "Usuário",
    "email": "user@filminis.com",
    "role": "user",
    "data_criacao": "2025-06-11T10:00:00"
  }
]
```

---

#### **PATCH** `/usuarios/{id}/role`
Altera o role (permission level) de um usuário.

**Auth:** Obrigatório | Role: **admin** apenas

**Path Parameters:**
- `id` — ID do usuário a ser modificado

**Request:**
```json
{
  "role": "admin"
}
```

**Response (200 OK):**
```json
{
  "id_usuario": 3,
  "nome": "Usuário",
  "email": "user@filminis.com",
  "role": "admin"
}
```

---

#### **DELETE** `/usuarios/{id}`
Remove um usuário do sistema.

**Auth:** Obrigatório | Role: **admin** apenas

**Path Parameters:**
- `id` — ID do usuário a ser deletado

**Response (200 OK):**
```json
{
  "mensagem": "Usuário deletado com sucesso"
}
```

---

### Filmes — `/filmes`

#### **GET** `/filmes`
Lista filmes aprovados com suporte a filtros avançados.

**Auth:** Público

**Query Parameters:**
| Parâmetro | Tipo | Exemplo | Descrição |
|-----------|------|---------|-----------|
| `titulo` | string | `batman` | Busca parcial (case-insensitive) |
| `ano` | int | `2022` | Filtra por ano de lançamento |
| `categoria` | int | `1` | Filtra por ID da categoria |
| `ator` | int | `5` | Filtra por ID do ator |
| `diretor` | int | `2` | Filtra por ID do diretor |
| `pais` | int | `1` | Filtra por ID do país de origem |
| `skip` | int | `0` | Offset de paginação |
| `limit` | int | `20` | Quantidade de resultados (padrão: 20) |

**Example:**
```bash
GET /filmes?titulo=batman&categoria=9&skip=0&limit=10
```

**Response (200 OK):**
```json
[
  {
    "id_filme": 13,
    "titulo": "The Batman",
    "ano": 2022,
    "duracao": "02:56:00",
    "sinopse": "Batman persegue o Charada...",
    "orcamento": 200000000.00,
    "poster": "https://...",
    "banner": "https://...",
    "trailer": "https://youtu.be/rsQEor4y2hg",
    "flag": true,
    "categorias": [
      { "id_categoria": 9, "nome": "Super-herói" },
      { "id_categoria": 10, "nome": "Crime" }
    ],
    "atores": [
      { "id_ator": 16, "nome": "Robert", "sobrenome": "Pattinson" }
    ],
    "diretores": [
      { "id_diretor": 13, "nome": "Matt", "sobrenome": "Reeves" }
    ],
    "pais_origem": {
      "id_pais": 1,
      "nome": "Estados Unidos"
    },
    "produtoras": [
      { "id_produtora": 12, "nome": "DC Studios" }
    ]
  }
]
```

---

#### **GET** `/filmes/{id}`
Retorna detalhes completos de um filme específico.

**Auth:** Público

**Path Parameters:**
- `id` — ID do filme

**Response (200 OK):** (Mesmo formato do GET /filmes, com um único objeto)

---

#### **GET** `/filmes/pendentes`
Lista filmes aguardando aprovação de admin.

**Auth:** Obrigatório | Role: **admin** apenas

**Query Parameters:**
- `skip` | `limit` — Paginação (opcional)

**Response (200 OK):** (Lista de filmes com `flag: false`)

---

#### **POST** `/filmes`
Cadastra um novo filme (fica pendente de aprovação).

**Auth:** Obrigatório

**Request:**
```json
{
  "titulo": "Novo Filme 2025",
  "ano": 2025,
  "duracao": "02:30:00",
  "sinopse": "Uma história incrível sobre...",
  "orcamento": 50000000.00,
  "poster": "https://example.com/poster.jpg",
  "banner": "https://example.com/banner.jpg",
  "trailer": "https://youtu.be/xxxxx",
  "id_produtora_principal": 1,
  "id_pais_origem": 1,
  "ids_categorias": [1, 3],
  "ids_atores": [5, 8],
  "ids_diretores": [1],
  "ids_linguagens": [1],
  "ids_paises": [1],
  "ids_produtoras": [1, 9]
}
```

**Response (201 Created):**
```json
{
  "id_filme": 14,
  "titulo": "Novo Filme 2025",
  "ano": 2025,
  "duracao": "02:30:00",
  "sinopse": "Uma história incrível sobre...",
  "flag": false,
  "mensagem": "Filme cadastrado! Aguarde aprovação de um administrador."
}
```

---

#### **PATCH** `/filmes/{id}`
Edita informações de um filme (apenas admin).

**Auth:** Obrigatório | Role: **admin** apenas

**Path Parameters:**
- `id` — ID do filme

**Request:** (Mesmos campos do POST, todos opcionais)
```json
{
  "titulo": "Novo Filme 2025 — Edição Final",
  "ano": 2025
}
```

**Response (200 OK):** (Retorna o filme atualizado)

---

#### **PUT** `/filmes/{id}/aprovar`
Aprova um filme pendente (muda `flag` para true).

**Auth:** Obrigatório | Role: **admin** apenas

**Path Parameters:**
- `id` — ID do filme a aprovar

**Response (200 OK):**
```json
{
  "id_filme": 14,
  "titulo": "Novo Filme 2025",
  "flag": true,
  "mensagem": "Filme aprovado com sucesso!"
}
```

---

#### **DELETE** `/filmes/{id}`
Remove um filme do sistema.

**Auth:** Obrigatório | Role: **admin** apenas

**Path Parameters:**
- `id` — ID do filme a deletar

**Response (200 OK):**
```json
{
  "mensagem": "Filme deletado com sucesso"
}
```

---

### Dados Auxiliares — `/dados`

Endpoints para recuperar dados de lookup (países, categorias, atores, etc).

#### **GET** `/dados/paises`
Lista todos os países.

**Auth:** Público

**Response (200 OK):**
```json
[
  { "id_pais": 1, "nome": "Estados Unidos" },
  { "id_pais": 2, "nome": "Brasil" },
  { "id_pais": 3, "nome": "Japão" }
]
```

---

#### **GET** `/dados/categorias`
Lista todas as categorias/gêneros.

**Response (200 OK):**
```json
[
  { "id_categoria": 1, "nome": "Ação" },
  { "id_categoria": 2, "nome": "Aventura" },
  { "id_categoria": 3, "nome": "Ficção Científica" }
]
```

---

#### **GET** `/dados/linguagens`
Lista todos os idiomas.

**Response (200 OK):**
```json
[
  { "id_linguagem": 1, "nome": "Inglês" },
  { "id_linguagem": 2, "nome": "Português" }
]
```

---

#### **GET** `/dados/produtoras`
Lista todas as produtoras.

**Response (200 OK):**
```json
[
  { "id_produtora": 1, "nome": "Warner Bros" },
  { "id_produtora": 3, "nome": "Marvel Studios" }
]
```

---

#### **GET** `/dados/atores`
Lista todos os atores.

**Response (200 OK):**
```json
[
  { "id_ator": 1, "nome": "Matthew", "sobrenome": "McConaughey" },
  { "id_ator": 8, "nome": "Leonardo", "sobrenome": "DiCaprio" }
]
```

---

#### **GET** `/dados/diretores`
Lista todos os diretores.

**Response (200 OK):**
```json
[
  { "id_diretor": 1, "nome": "Christopher", "sobrenome": "Nolan" },
  { "id_diretor": 2, "nome": "Peter", "sobrenome": "Jackson" }
]
```

---

### Destaques da Home — `/home/destaques`

#### **GET** `/home/destaques`
Retorna filmes em destaque ordenados por prioridade.

**Auth:** Público

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "id_filme": 1,
    "ordem": 1,
    "filme": {
      "id_filme": 1,
      "titulo": "Interestelar",
      "ano": 2014,
      "poster": "https://...",
      "banner": "https://..."
    }
  },
  {
    "id": 2,
    "id_filme": 2,
    "ordem": 2,
    "filme": {
      "id_filme": 2,
      "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
      "ano": 2001,
      "poster": "https://...",
      "banner": "https://..."
    }
  }
]
```

---

#### **PUT** `/home/destaques`
Substitui todos os destaques por uma nova lista ordenada.

**Auth:** Obrigatório | Role: **admin** apenas

**Request:**
```json
{
  "ids_filmes": [3, 7, 1, 12, 10]
}
```

> **Nota:** A ordem dos IDs define a ordem de exibição na página inicial. Todos os IDs devem corresponder a filmes existentes e aprovados.

**Response (200 OK):**
```json
{
  "mensagem": "Destaques atualizados com sucesso",
  "destaques": [
    { "id": 1, "id_filme": 3, "ordem": 1 },
    { "id": 2, "id_filme": 7, "ordem": 2 },
    { "id": 3, "id_filme": 1, "ordem": 3 },
    { "id": 4, "id_filme": 12, "ordem": 4 },
    { "id": 5, "id_filme": 10, "ordem": 5 }
  ]
}
```

---

#### **DELETE** `/home/destaques`
Remove todos os destaques.

**Auth:** Obrigatório | Role: **admin** apenas

**Response (200 OK):**
```json
{
  "mensagem": "Todos os destaques foram removidos"
}
```

---

---

## Fluxo de Autenticação Completo

```
┌─────────────────────────────────────────────────────────┐
│                    NOVO USUÁRIO                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. POST /auth/register                                 │
│     ✓ Cadastra conta com role="user"                    │
│     ✓ Senha é criptografada com bcrypt                  │
│                                                          │
│  2. POST /auth/login                                    │
│     ✓ Retorna access_token + refresh_token              │
│     ✓ access_token expira em 30 minutos                 │
│     ✓ refresh_token expira em 7 dias                    │
│                                                          │
│  3. [Usando Access Token]                               │
│     ✓ Header: Authorization: Bearer <access_token>      │
│     ✓ Acesso a endpoints autenticados                   │
│     ✓ Pode cadastrar filmes, editar perfil              │
│                                                          │
│  4. [Token expirado?]                                   │
│     ✓ POST /auth/refresh com refresh_token              │
│     ✓ Recebe novo access_token                          │
│                                                          │
│  5. POST /auth/logout                                   │
│     ✓ Refresh token é adicionado à blacklist            │
│     ✓ Token não poderá ser usado novamente              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Tokens JWT (exemplo decodificado):**

```json
{
  "sub": "user@example.com",
  "user_id": 3,
  "role": "user",
  "iat": 1718092800,
  "exp": 1718094600
}
```

---

## Regras de Negócio

### Filmes
- Qualquer usuário **autenticado** pode **cadastrar** filmes
- Filmes novos ficam com `flag = false` (pendentes de aprovação)
- Apenas **admins** podem **aprovar**, **editar** ou **deletar** filmes
- Admins veem filmes pendentes em `/filmes/pendentes`
- Um filme deve ter exatamente **um país de origem**
- Um filme deve ter **uma produtora principal** (obrigatória)
- Um filme pode ter **múltiplas** produtoras, atores, diretores, categorias, idiomas

### Usuários
- Cada usuário tem **uma role**: `user` ou `admin`
- Role padrão para novos usuários é `user`
- Apenas **admins** podem **alterar roles** e **deletar usuários**
- Senhas são armazenadas em **bcrypt** (nunca em texto puro)
- Email e apelido são **únicos** no sistema

### Autenticação
- Access token expira em **30 minutos** (configurável em `.env`)
- Refresh token expira em **7 dias** (configurável em `.env`)
- Logout invalida o refresh token permanentemente (blacklist)
- Endpoints de `/auth/register` e `/auth/login` são **públicos** (sem autenticação)

### Destaques
- Apenas **5 filmes** no máximo devem estar em destaque
- A ordem dos destaques importa (controla ordem de exibição)
- Destaques podem ser atualizados a qualquer momento por admins
- Um filme só pode estar em destaque se estiver **aprovado** (`flag = true`)

---

## Exemplos de Requisições (cURL)

### 1 - Registrar novo usuário

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João",
    "sobrenome": "Silva",
    "apelido": "joao_silva",
    "email": "joao@example.com",
    "senha": "SenhaForte123!"
  }'
```

**Response:**
```json
{
  "id_usuario": 5,
  "nome": "João",
  "email": "joao@example.com",
  "role": "user"
}
```

---

### 2 - Fazer login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "SenhaForte123!"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "usuario": {
    "id_usuario": 5,
    "nome": "João",
    "role": "user"
  }
}
```

---

### 3 - Acessar perfil (autenticado)

```bash
curl http://localhost:8000/usuarios/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 4 - Listar filmes aprovados (público)

```bash
# Listar todos
curl http://localhost:8000/filmes

# Com paginação
curl "http://localhost:8000/filmes?skip=0&limit=10"

# Filtrar por título
curl "http://localhost:8000/filmes?titulo=batman"

# Filtrar por ano e categoria
curl "http://localhost:8000/filmes?ano=2022&categoria=9"

# Combinar filtros
curl "http://localhost:8000/filmes?titulo=super&ator=9&skip=0&limit=5"
```

---

### 5 - Obter detalhes de um filme

```bash
curl http://localhost:8000/filmes/13
```

**Response:**
```json
{
  "id_filme": 13,
  "titulo": "The Batman",
  "ano": 2022,
  "duracao": "02:56:00",
  "sinopse": "Batman persegue o Charada...",
  "orcamento": 200000000.00,
  "poster": "https://...",
  "banner": "https://...",
  "trailer": "https://youtu.be/rsQEor4y2hg",
  "flag": true,
  "categorias": [
    { "id_categoria": 9, "nome": "Super-herói" },
    { "id_categoria": 10, "nome": "Crime" }
  ],
  "atores": [
    { "id_ator": 16, "nome": "Robert", "sobrenome": "Pattinson" }
  ],
  "diretores": [
    { "id_diretor": 13, "nome": "Matt", "sobrenome": "Reeves" }
  ]
}
```

---

### 6 - Cadastrar novo filme (autenticado)

```bash
curl -X POST http://localhost:8000/filmes \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Novo Filme Incrível",
    "ano": 2025,
    "duracao": "02:30:00",
    "sinopse": "Uma aventura épica através do tempo e espaço.",
    "orcamento": 150000000.00,
    "poster": "https://example.com/poster.jpg",
    "banner": "https://example.com/banner.jpg",
    "trailer": "https://youtu.be/xxxxx",
    "id_produtora_principal": 1,
    "id_pais_origem": 1,
    "ids_categorias": [1, 3],
    "ids_atores": [1, 2],
    "ids_diretores": [1],
    "ids_linguagens": [1],
    "ids_paises": [1],
    "ids_produtoras": [1, 9]
  }'
```

**Response:**
```json
{
  "id_filme": 14,
  "titulo": "Novo Filme Incrível",
  "flag": false,
  "mensagem": "Filme cadastrado! Aguarde aprovação de um administrador."
}
```

> O filme fica com `flag: false` até um admin aprovar

---

### 7 - Listar filmes pendentes (admin only)

```bash
curl http://localhost:8000/filmes/pendentes \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

### 8 - Aprovar um filme (admin only)

```bash
curl -X PUT http://localhost:8000/filmes/14/aprovar \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
{
  "id_filme": 14,
  "titulo": "Novo Filme Incrível",
  "flag": true,
  "mensagem": "Filme aprovado com sucesso!"
}
```

---

### 9 - Editar um filme (admin only)

```bash
curl -X PATCH http://localhost:8000/filmes/14 \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sinopse": "Uma aventura épica corrigida...",
    "orcamento": 160000000.00
  }'
```

---

### 10 - Obter dados de lookup

```bash
# Países
curl http://localhost:8000/dados/paises

# Categorias
curl http://localhost:8000/dados/categorias

# Atores
curl http://localhost:8000/dados/atores

# Diretores
curl http://localhost:8000/dados/diretores

# Produtoras
curl http://localhost:8000/dados/produtoras

# Linguagens
curl http://localhost:8000/dados/linguagens
```

---

### 11 - Gerenciar destaques (admin only)

```bash
# Obter destaques atuais (público)
curl http://localhost:8000/home/destaques

# Atualizar destaques (admin only)
curl -X PUT http://localhost:8000/home/destaques \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ids_filmes": [1, 2, 8, 10, 13]
  }'

# Remover todos os destaques (admin only)
curl -X DELETE http://localhost:8000/home/destaques \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

### 12 - Renovar token expirado

```bash
curl -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

### 13 - Fazer logout

```bash
curl -X POST http://localhost:8000/auth/logout \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

---

## Criando o primeiro admin

Após rodar o projeto pela primeira vez, você pode:

### **Opção 1:** Usar usuário pré-criado (se rodou `python -m app.models.population`)
```
Email: admin@filminis.com
Senha: adm123456
```

### **Opção 2:** Criar manualmente

1. Registre um usuário comum pela API
2. Altere seu role no banco SQL:
   ```sql
   UPDATE usuario SET role = 'admin' WHERE email = 'seu@email.com';
   ```

### **Opção 3:** Usar endpoint de admin (se houver outro admin)
```bash
curl -X PATCH http://localhost:8000/usuarios/5/role \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin"
  }'
```