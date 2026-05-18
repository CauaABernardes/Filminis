-- ============================================================
--  Filminis — DDL + DML
--  Execute este script no MySQL para criar e popular o banco.
--  Usuários de exemplo:
--    admin@filminis.com  / admin123
--    user@filminis.com   / user123
--  (as senhas são salvas com bcrypt via API, não SHA2)
-- ============================================================

DROP DATABASE IF EXISTS filminis;
CREATE DATABASE filminis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE filminis;

-- ── Tabelas auxiliares ────────────────────────────────────────────────────────

CREATE TABLE pais (
    id_pais   INT PRIMARY KEY AUTO_INCREMENT,
    nome      VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE linguagem (
    id_linguagem INT PRIMARY KEY AUTO_INCREMENT,
    nome         VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome         VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE produtora (
    id_produtora INT PRIMARY KEY AUTO_INCREMENT,
    nome         VARCHAR(255) NOT NULL UNIQUE
);

-- ── Pessoas ───────────────────────────────────────────────────────────────────

CREATE TABLE ator (
    id_ator    INT PRIMARY KEY AUTO_INCREMENT,
    nome       VARCHAR(255) NOT NULL UNIQUE,
    sobrenome  VARCHAR(255) NOT NULL
);

CREATE TABLE diretor (
    id_diretor INT PRIMARY KEY AUTO_INCREMENT,
    nome       VARCHAR(255) NOT NULL UNIQUE,
    sobrenome  VARCHAR(255) NOT NULL
);

-- ── Relacionamentos N:N auxiliares ───────────────────────────────────────────

CREATE TABLE ator_pais (
    id_ator_pais INT PRIMARY KEY AUTO_INCREMENT,
    id_ator      INT NOT NULL,
    id_pais      INT NOT NULL,
    FOREIGN KEY (id_ator) REFERENCES ator(id_ator),
    FOREIGN KEY (id_pais) REFERENCES pais(id_pais)
);

CREATE TABLE diretor_pais (
    id_diretor_pais INT PRIMARY KEY AUTO_INCREMENT,
    id_pais         INT NOT NULL,
    id_diretor      INT NOT NULL,
    FOREIGN KEY (id_pais)    REFERENCES pais(id_pais),
    FOREIGN KEY (id_diretor) REFERENCES diretor(id_diretor)
);

CREATE TABLE produtora_pais (
    id_produtora_pais INT PRIMARY KEY AUTO_INCREMENT,
    id_produtora      INT NOT NULL,
    id_pais           INT NOT NULL,
    FOREIGN KEY (id_produtora) REFERENCES produtora(id_produtora),
    FOREIGN KEY (id_pais)      REFERENCES pais(id_pais)
);

-- ── Filme ─────────────────────────────────────────────────────────────────────

CREATE TABLE filme (
    id_filme               INT PRIMARY KEY AUTO_INCREMENT,
    titulo                 VARCHAR(255) NOT NULL UNIQUE,
    id_produtora_principal INT,
    orcamento              DECIMAL(15,2),
    duracao                TIME,
    sinopse                LONGTEXT UNIQUE,
    ano                    INT,
    poster                 VARCHAR(255) UNIQUE,
    banner                 VARCHAR(255) UNIQUE,
    trailer                VARCHAR(255) UNIQUE,
    flag                   BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_produtora_principal) REFERENCES produtora(id_produtora)
);

CREATE TABLE filme_produtora (
    id_filme_produtora INT PRIMARY KEY AUTO_INCREMENT,
    id_filme           INT NOT NULL,
    id_produtora       INT NOT NULL,
    FOREIGN KEY (id_filme)      REFERENCES filme(id_filme),
    FOREIGN KEY (id_produtora)  REFERENCES produtora(id_produtora)
);

CREATE TABLE filme_pais (
    id_filme_pais INT PRIMARY KEY AUTO_INCREMENT,
    id_filme      INT NOT NULL,
    id_pais       INT NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
    FOREIGN KEY (id_pais)  REFERENCES pais(id_pais)
);

CREATE TABLE filme_categoria (
    id_filme_categoria INT PRIMARY KEY AUTO_INCREMENT,
    id_filme           INT NOT NULL,
    id_categoria       INT NOT NULL,
    FOREIGN KEY (id_filme)     REFERENCES filme(id_filme),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE filme_ator (
    id_filme_ator INT PRIMARY KEY AUTO_INCREMENT,
    id_filme      INT NOT NULL,
    id_ator       INT NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
    FOREIGN KEY (id_ator)  REFERENCES ator(id_ator)
);

CREATE TABLE filme_diretor (
    id_filme_diretor INT PRIMARY KEY AUTO_INCREMENT,
    id_filme         INT NOT NULL,
    id_diretor       INT NOT NULL,
    FOREIGN KEY (id_filme)   REFERENCES filme(id_filme),
    FOREIGN KEY (id_diretor) REFERENCES diretor(id_diretor)
);

CREATE TABLE filme_linguagem (
    id_filme_linguagem INT PRIMARY KEY AUTO_INCREMENT,
    id_filme           INT NOT NULL,
    id_linguagem       INT NOT NULL,
    FOREIGN KEY (id_filme)     REFERENCES filme(id_filme),
    FOREIGN KEY (id_linguagem) REFERENCES linguagem(id_linguagem)
);

-- ── Usuário ───────────────────────────────────────────────────────────────────

CREATE TABLE usuario (
    id_usuario      INT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(255) NOT NULL,
    sobrenome       VARCHAR(255),
    apelido         VARCHAR(100) UNIQUE,
    email           VARCHAR(255) NOT NULL UNIQUE,
    senha           VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    imagem          VARCHAR(500),
    role            ENUM('admin','user') NOT NULL DEFAULT 'user',
    data_criacao    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── Blacklist de refresh tokens ───────────────────────────────────────────────

CREATE TABLE refresh_token_blacklist (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    token      VARCHAR(512) NOT NULL UNIQUE,
    criado_em  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  DML — dados de exemplo
-- ============================================================

INSERT INTO pais (nome) VALUES
('Estados Unidos'),('Reino Unido'),('Japão'),('Canadá'),('França'),
('Alemanha'),('Brasil'),('Nova Zelândia'),('Coreia do Sul'),('Espanha'),
('México'),('Chile'),('Itália'),('Suécia'),('Ucrânia'),('Austrália'),('Guatemala');

INSERT INTO linguagem (nome) VALUES
('Inglês'),('Japonês'),('Português'),('Francês'),('Espanhol'),
('Dinamarquês'),('Romeno'),('Romani'),('Russo'),('Latim'),
('Alemão'),('Italiano'),('Chinês'),('Coreano'),('Xhosa'),
('Húngaro'),('Tagalo'),('Mandarim');

INSERT INTO categoria (nome) VALUES
('Ação'),('Aventura'),('Animação'),('Comédia'),('Crime'),('Drama'),
('Fantasia'),('Ficção Científica'),('Gótico'),('Musical'),('Neo-noir'),
('Romance'),('Super-herói'),('Suspense'),('Terror'),('Thriller');

INSERT INTO produtora (nome) VALUES
('Summit Entertainment'),('Studio Ghibli'),('Regency Enterprises'),('Millenium Films'),
('6th & Idaho'),('Warner Bros.'),('Proximity Media'),('Netflix'),
('Lakeshore Entertainment'),('20th Century Fox'),('Marvel Studios'),
('Paramount Pictures'),('Thunder Road Pictures'),('Legendary Pictures'),('Sony Pictures Animation');

INSERT INTO ator (nome, sobrenome) VALUES
('Kristen','Stewart'),('Robert','Pattinson'),('Taylor','Lautner'),
('Yōji','Matsuda'),('Yuriko','Ishida'),('Yūko','Tanaka'),
('Bill','Skarsgård'),('Lily-Rose','Depp'),('Nicholas','Hoult'),
('David','Harbour'),('Milla','Jovovich'),('Zoë','Kravitz'),
('Paul','Dano'),('David','Corenswet'),('Rachel','Brosnahan'),
('Milly','Alcock'),('Michael','B. Jordan'),('Hailee','Steinfeld'),
('Oscar','Isaac'),('Jacob','Elordi'),('Mia','Goth'),
('Jason','Statham'),('Amy','Smart'),('Nicole','Kidman'),
('Ewan','McGregor'),('Robert','Downey Jr.'),('Chris','Evans'),
('Mark','Ruffalo'),('Chris','Hemsworth'),('Scarlett','Johansson'),
('Matthew','McConaughey'),('Anne','Hathaway'),('Keanu','Reeves'),
('Michael','Nyqvist'),('Chieko','Baishô'),('Takuya','Kimura'),
('Akihiro','Miwa'),('Tom','Holland'),('Zendaya',''),
('Benedict','Cumberbatch'),('Margot','Robbie'),('Ryan','Gosling'),
('America','Ferrera'),('Ryan','Reynolds'),('Morena','Baccarin'),
('Timothée','Chalamet'),('Rebecca','Ferguson'),('Laurence','Fishburne'),
('Carrie-Anne','Moss'),('Arden','Cho'),('May','Hong'),('Ji-young','Yoo');

INSERT INTO diretor (nome, sobrenome) VALUES
('Catherine','Hardwicke'),('Hayao','Miyazaki'),('Robert','Eggers'),
('Neil','Marshall'),('Matt','Reeves'),('James','Gunn'),
('Ryan','Coogler'),('Guillermo','del Toro'),('Mark','Neveldine'),
('Brian','Taylor'),('Baz','Luhrmann'),('Anthony','Russo'),
('Joe','Russo'),('Christopher','Nolan'),('Chad','Stahelski'),
('Jon','Watts'),('Greta','Gerwig'),('Tim','Miller'),
('Denis','Villeneuve'),('Lana','Wachowski'),('Lilly','Wachowski'),
('Maggie','Kang'),('Chris','Appelhans');

INSERT INTO filme (titulo, id_produtora_principal, id_pais_origem, orcamento, duracao, sinopse, ano, poster, flag) VALUES
('Crepúsculo',1,1,37000000,'02:02:00',
'Bella Swan se apaixona pelo misterioso e deslumbrante Edward Cullen, descobrindo que ele é um vampiro.',
2008,
'https://br.web.img2.acsta.net/medias/nmedia/18/87/02/32/19871201.jpg',
TRUE),
('A Princesa Mononoke',2,3,20000000,'02:13:00',
'Um jovem guerreiro se envolve em um conflito entre deuses da floresta e humanos que destroem a natureza.',
1997,
'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2025/03/Poster-Princesa-Mononoke-IMAX-scaled.jpeg',
TRUE),
('Nosferatu',3,1,50000000,'02:12:00',
'Uma jovem casada é assombrada por um antigo mal enquanto seu marido viaja para fechar negócio com um misterioso conde.',
2024,
'https://m.media-amazon.com/images/I/715BLU5YPZL.jpg',
TRUE),
('Hellboy',4,1,50000000,'02:01:00',
'Um ser sobrenatural luta contra forças das trevas enquanto protege o mundo humano.',
2019,
'https://img.elo7.com.br/product/zoom/25FA55C/big-poster-filme-hellboy-2019-lo004-tamanho-90x60-cm-hellboy.jpg',
TRUE),
('The Batman',5,1,185000000,'02:56:00',
'Bruce Wayne rastreia um assassino serial chamado Charada que expõe a corrupção em Gotham.',
2022,
'https://img.elo7.com.br/product/zoom/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
TRUE),
('Superman',6,1,225000000,'02:30:00',
'Clark Kent abraça seu legado kryptoniano enquanto enfrenta Lex Luthor.',
2025,
'https://ingresso-a.akamaihd.net/b2b/production/uploads/articles-content/8923869c-f8a6-4258-ba74-4170bf7fb202.jpg',
TRUE),
('Pecadores',7,1,90000000,'02:17:00',
'Dois irmãos retornam ao Mississippi para abrir um negócio, mas o sobrenatural bate à porta.',
2025,
'https://ingresso-a.akamaihd.net/prd/img/movie/pecadores/7f6c9699-002e-43a8-adb3-49d2055014fd.webp',
TRUE),
('Frankenstein',8,1,120000000,'02:30:00',
'Guillermo del Toro adapta o clássico de Mary Shelley sobre um cientista que cria vida.',
2025,
'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2025/08/31180656/frankenstein-2025-poster-691x1024.jpg',
TRUE),
('Adrenalina',9,1,12000000,'01:28:00',
'Envenenado por rivais, o assassino Chev Chelios precisa manter sua adrenalina alta para sobreviver.',
2006,
'https://br.web.img3.acsta.net/medias/nmedia/18/86/97/09/19870658.jpg',
TRUE),
('Moulin Rouge',10,5,50000000,'02:06:00',
'Um jovem escritor se apaixona pela estrela do Moulin Rouge em um Paris boêmio.',
2001,
'https://uauposters.com.br/media/catalog/product/3/4/346820211103-uau-posters-moulin-rouge-filmes.jpg',
TRUE),
('Vingadores: Ultimato',11,1,356000000,'03:01:00',
'Os Vingadores se unem para reverter os efeitos devastadores do Thanos.',
2019,
'https://img.elo7.com.br/product/zoom/259A7AA/big-poster-filme-vingadores-ultimato-lo001-tamanho-90x60-cm-poster-marvel.jpg',
TRUE),
('Interestelar',12,1,165000000,'02:49:00',
'Um ex-piloto viaja por um buraco de minhoca em busca de um novo lar para a humanidade.',
2014,
'https://br.web.img3.acsta.net/pictures/14/10/31/20/39/476171.jpg',
TRUE),
('John Wick',13,1,20000000,'01:41:00',
'Um ex-assassino retorna à ativa para vingar a morte de seu cachorro, presente da esposa falecida.',
2014,
'https://img.elo7.com.br/product/zoom/265E435/big-poster-filme-john-wick-lo03-tamanho-90x60-cm-nerd.jpg',
TRUE),
('O Castelo Animado',2,3,24000000,'01:59:00',
'Sophie é amaldiçoada e transformada em velha; busca quebrar o feitiço no castelo do mago Howl.',
2004,
'https://i.pinimg.com/474x/ec/f5/96/ecf596b4b836dba11873a07b12381088.jpg',
TRUE),
('Homem-Aranha: Sem Volta Para Casa',11,1,200000000,'02:28:00',
'Peter Parker pede ao Doutor Estranho para fazer o mundo esquecer sua identidade, fragmentando o multiverso.',
2021,
'https://cinecriticas.com.br/wp-content/uploads/2021/12/Cine1-12.jpg',
TRUE),
('Barbie',6,1,145000000,'01:54:00',
'Barbie deixa Barbieland e vai ao mundo real para resolver uma crise existencial.',
2023,
'https://uauposters.com.br/media/catalog/product/cache/1/thumbnail/800x930/9df78eab33525d08d6e5fb8d27136e95/4/5/454520230615-uau-posters-barbie-2023-filmes-1.jpg',
TRUE),
('Deadpool',10,1,58000000,'01:48:00',
'Wade Wilson se torna o mercenário de boca suja Deadpool após um experimento que lhe dá poderes de regeneração.',
2016,
'https://img.elo7.com.br/product/zoom/1E3BBFE/big-poster-do-filme-deadpool-tamanho-90x-0-cm-loot-op-011-geek.jpg',
TRUE),
('Duna',14,1,165000000,'02:35:00',
'Paul Atreides lidera uma revolta no planeta mais perigoso do universo.',
2021,
'https://img.elo7.com.br/product/zoom/3E882A2/big-poster-filme-duna-tamanho-90x60-cm-duna.jpg',
TRUE),
('Matrix',6,1,63000000,'02:16:00',
'Um hacker descobre que a realidade é uma simulação e se junta à resistência humana.',
1999,
'https://img.elo7.com.br/product/zoom/2679A17/big-poster-filme-matrix-lo02-tamanho-90x60-cm-poster-de-filme.jpg',
TRUE),
('KPop Demon Hunters',15,9,80000000,'01:45:00',
'Um grupo de K-Pop mundialmente famoso equilibra a vida no palco com sua identidade secreta de caçadoras de demônios.',
2025,
'https://m.media-amazon.com/images/I/81Mtr7elTnL.jpg',
TRUE);

-- Relações N:N (mesmas do original da professora)

INSERT INTO filme_produtora (id_filme, id_produtora) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),
(11,11),(12,12),(12,6),(13,13),(14,2),(15,11),(16,6),(17,10),(17,11),(18,14),(19,6),(20,15);

INSERT INTO filme_diretor (id_filme, id_diretor) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(9,10),
(10,11),(11,12),(11,13),(12,14),(13,15),(14,2),(15,16),(16,17),(17,18),
(18,19),(19,20),(19,21),(20,22),(20,23);

INSERT INTO filme_linguagem (id_filme, id_linguagem) VALUES
(1,1),(2,2),(3,1),(3,7),(3,8),(3,9),(3,10),(3,11),
(4,1),(4,5),(4,6),(4,11),(5,1),(5,5),(5,10),(6,1),
(7,1),(7,13),(8,1),(8,6),(8,4),(9,1),(9,5),
(10,1),(10,4),(10,5),(11,1),(11,2),(11,15),(11,11),(12,1),
(13,1),(13,11),(13,16),(14,2),(15,1),(15,17),(16,1),(16,5),
(17,1),(18,1),(18,18),(19,1),(20,1),(20,14);

INSERT INTO filme_categoria (id_filme, id_categoria) VALUES
(1,7),(1,12),(1,6),(2,7),(2,2),(2,3),(3,15),(3,8),(4,7),(4,1),(4,15),
(5,1),(5,6),(5,11),(5,13),(6,1),(6,7),(6,13),(7,15),(7,7),(7,6),
(8,15),(8,6),(8,8),(9,1),(9,5),(9,16),(10,6),(10,10),(10,12),
(11,1),(11,2),(11,7),(11,13),(12,8),(12,2),(13,1),(13,14),(14,7),(14,3),
(15,1),(15,2),(15,8),(15,13),(16,4),(16,7),(17,1),(17,4),(17,13),
(18,8),(18,2),(19,1),(19,8),(20,3),(20,7),(20,10);

INSERT INTO filme_ator (id_filme, id_ator) VALUES
(1,1),(1,2),(1,3),(2,4),(2,5),(2,6),(3,7),(3,8),(3,9),(4,10),(4,11),
(5,2),(5,12),(5,13),(6,14),(6,15),(6,16),(7,17),(7,18),(8,19),(8,20),(8,21),
(9,22),(9,23),(10,24),(10,25),(11,26),(11,27),(11,28),(11,29),(11,30),
(12,31),(12,32),(13,33),(13,34),(14,35),(14,36),(14,37),(15,38),(15,39),(15,40),
(16,41),(16,42),(16,43),(17,44),(17,45),(18,46),(18,47),(18,19),(18,39),
(19,33),(19,48),(19,49),(20,50),(20,51),(20,52);

INSERT INTO ator_pais (id_ator, id_pais) VALUES
(1,1),(2,2),(3,1),(4,3),(5,3),(6,3),(7,14),(8,1),(9,2),(10,1),
(11,15),(12,1),(13,1),(14,1),(15,1),(16,16),(17,1),(18,1),(19,17),(20,16),
(21,2),(22,2),(23,1),(24,16),(25,2),(26,1),(27,1),(28,1),(29,16),(30,1),
(31,1),(32,1),(33,4),(34,14),(35,3),(36,3),(37,3),(38,2),(39,1),(40,2),
(41,16),(42,4),(43,1),(44,1),(45,7),(46,1),(47,14),(48,1),(49,1),(50,1),
(51,9),(52,1);

INSERT INTO diretor_pais (id_diretor, id_pais) VALUES
(1,1),(2,3),(3,1),(4,2),(5,1),(6,1),(7,1),(8,11),(9,1),(10,1),
(11,16),(12,1),(13,1),(14,2),(15,1),(16,1),(17,1),(18,1),(19,4),(20,1),
(21,1),(22,9),(23,1);

INSERT INTO produtora_pais (id_produtora, id_pais) VALUES
(1,1),(2,3),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),
(11,1),(12,1),(13,1),(14,1),(15,1);

-- ── Usuários de exemplo (senhas com bcrypt — crie via API ou use estes hashes) ──
-- Para criar usuários com senha correta, use o endpoint POST /auth/register
-- Os valores abaixo são apenas placeholders; substitua pelos hashes gerados pela API.
-- Exemplo rápido via curl:
--   curl -X POST http://localhost:8000/auth/register \
--        -H "Content-Type: application/json" \
--        -d '{"nome":"Admin","email":"admin@filminis.com","senha":"admin123"}'
