from datetime import time

from app.core.database import SessionLocal
from app.models.models import (
    Pais, Linguagem, Categoria, Produtora,
    Ator, Diretor, Filme,
    FilmeProdutora, FilmePais, FilmeCategoria,
    FilmeAtor, FilmeDiretor, FilmeLinguagem,
    Usuario, DestaqueHome
)

db = SessionLocal()

paises = [
    Pais(nome="Estados Unidos"),
    Pais(nome="Brasil"),
    Pais(nome="Japão"),
    Pais(nome="Coreia do Sul"),
    Pais(nome="Reino Unido"),
    Pais(nome="França"),
    Pais(nome="Alemanha"),
    Pais(nome="Canadá"),
    Pais(nome="Austrália"),
    Pais(nome="Nova Zelândia"),
]

db.add_all(paises)
db.commit()

idiomas = [
    Linguagem(nome="Inglês"),
    Linguagem(nome="Português"),
    Linguagem(nome="Japonês"),
    Linguagem(nome="Coreano"),
    Linguagem(nome="Francês"),
    Linguagem(nome="Alemão"),
    Linguagem(nome="Espanhol"),
    Linguagem(nome="Italiano"),
    Linguagem(nome="Mandarim"),
    Linguagem(nome="Russo"),
]

db.add_all(idiomas)
db.commit()

categorias = [
    Categoria(nome="Ação"),
    Categoria(nome="Aventura"),
    Categoria(nome="Ficção Científica"),
    Categoria(nome="Drama"),
    Categoria(nome="Terror"),
    Categoria(nome="Animação"),
    Categoria(nome="Comédia"),
    Categoria(nome="Romance"),
    Categoria(nome="Super-herói"),
    Categoria(nome="Crime"),
    Categoria(nome="Suspense"),
    Categoria(nome="Musical"),
    Categoria(nome="Fantasia"),  # CORRIGIDO: adicionada para LOTR
]

db.add_all(categorias)
db.commit()


produtoras = [
    Produtora(nome="Warner Bros"),
    Produtora(nome="Universal Pictures"),
    Produtora(nome="Marvel Studios"),
    Produtora(nome="20th Century Studios"),
    Produtora(nome="Columbia Pictures"),
    Produtora(nome="Studio Ghibli"),
    Produtora(nome="Toho"),
    Produtora(nome="A24"),
    Produtora(nome="Legendary Pictures"),
    Produtora(nome="Netflix Studios"),
    Produtora(nome="Summit Entertainment"),
    Produtora(nome="DC Studios"),
    Produtora(nome="Paramount Pictures"),  # CORRIGIDO: adicionada para Interestelar e Titanic
]

db.add_all(produtoras)
db.commit()

diretores = [
    Diretor(nome="Christopher", sobrenome="Nolan"),
    Diretor(nome="Peter", sobrenome="Jackson"),
    Diretor(nome="Robert", sobrenome="Zemeckis"),
    Diretor(nome="Stanley", sobrenome="Kubrick"),
    Diretor(nome="Hayao", sobrenome="Miyazaki"),
    Diretor(nome="Todd", sobrenome="Phillips"),
    Diretor(nome="James", sobrenome="Cameron"),
    Diretor(nome="Jon", sobrenome="Favreau"),
    Diretor(nome="Quentin", sobrenome="Tarantino"),
    Diretor(nome="Bong", sobrenome="Joon-ho"),
    Diretor(nome="George", sobrenome="Miller"),
    Diretor(nome="Damien", sobrenome="Chazelle"),
    Diretor(nome="Matt", sobrenome="Reeves"),
]

db.add_all(diretores)
db.commit()

atores = [
    Ator(nome="Matthew", sobrenome="McConaughey"),
    Ator(nome="Anne", sobrenome="Hathaway"),
    Ator(nome="Elijah", sobrenome="Wood"),
    Ator(nome="Tom", sobrenome="Hanks"),
    Ator(nome="Jack", sobrenome="Nicholson"),
    Ator(nome="Yoji", sobrenome="Matsuda"),
    Ator(nome="Bradley", sobrenome="Cooper"),
    Ator(nome="Leonardo", sobrenome="DiCaprio"),
    Ator(nome="Robert", sobrenome="Downey Jr."),
    Ator(nome="John", sobrenome="Travolta"),
    Ator(nome="Song", sobrenome="Kang-ho"),
    Ator(nome="Tom", sobrenome="Hardy"),
    Ator(nome="Ryan", sobrenome="Gosling"),
    Ator(nome="Emma", sobrenome="Stone"),
    Ator(nome="Scarlett", sobrenome="Johansson"),
    Ator(nome="Robert", sobrenome="Pattinson"),
]

db.add_all(atores)
db.commit()

admin = Usuario(
    nome="Administrador",
    sobrenome="Sistema",
    apelido="admin",
    email="admin@filminis.com",
    senha="$2b$10$WINkKfH02lCRsq2.Lyw8ge/uWpnABzzvy4TpZ9EdDwddCPcbsSE4m",
    role="admin"
)

user = Usuario(
    nome="Usuário",
    sobrenome="Teste",
    apelido="user",
    email="user@filminis.com",
    senha="$2b$10$uccNIZDU8pjD9ffcLFC3veCbDH8vi/BduFpIGdDwPJjJkET4bm1ja",
    role="user"
)

db.add(admin)
db.add(user)
db.commit()

filmes = [
    Filme(
        titulo="Interestelar",
        id_produtora_principal=13,  # CORRIGIDO: Paramount Pictures
        id_pais_origem=1,
        orcamento=165000000,
        duracao=time(2, 49, 0), 
        sinopse="Exploradores viajam pelo espaço em busca de um novo lar para a humanidade.",
        ano=2014,
        poster="https://i.pinimg.com/736x/44/6c/51/446c519155720379f706e0eb040cb205.jpg",
        banner="https://images8.alphacoders.com/560/thumb-1920-560736.jpg",
        trailer="https://youtu.be/i6avfCqKcQo",
        flag=True
    ),
    Filme(
        titulo="O Senhor dos Anéis: A Sociedade do Anel",
        id_produtora_principal=1,  # Warner Bros
        id_pais_origem=10,         # Nova Zelândia
        orcamento=93000000,
        duracao=time(2, 58, 0), 
        sinopse="Um hobbit parte em uma jornada para destruir um anel maligno.",
        ano=2001,
        poster="https://br.web.img3.acsta.net/medias/nmedia/18/92/91/32/20224832.jpg",
        banner="https://images5.alphacoders.com/644/thumb-1920-644699.png",
        trailer="https://youtu.be/0i86oM1nHjM",
        flag=True
    ),
    Filme(
        titulo="Forrest Gump",
        id_produtora_principal=13,  # CORRIGIDO: Paramount Pictures
        id_pais_origem=1,
        orcamento=55000000,
        duracao=time(2, 22, 0),
        sinopse="Um homem simples atravessa momentos marcantes da história americana.",
        ano=1994,
        poster="https://m.media-amazon.com/images/M/MV5BOGE2OTRmZTAtN2ViZS00YTEzLWIxYzQtMjc1YmNmODBmZDdmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        banner="https://images7.alphacoders.com/111/thumb-1920-1115209.jpg",
        trailer="https://youtu.be/bLvqoHBptjg",
        flag=True
    ),
    Filme(
        titulo="O Iluminado",
        id_produtora_principal=1,  # Warner Bros
        id_pais_origem=1,
        orcamento=19000000,
        duracao=time(2, 24, 0),
        sinopse="Um escritor se torna cuidador de um hotel isolado durante o inverno, onde forças sinistras influenciam sua mente.",
        ano=1980,
        poster="https://br.web.img3.acsta.net/pictures/14/10/10/19/21/152595.jpg",
        banner="https://images7.alphacoders.com/548/thumb-1920-548560.jpg",
        trailer="https://youtu.be/dSQ3yN5yJ0g",
        flag=True
    ),
    Filme(
        titulo="Princesa Mononoke",
        id_produtora_principal=6,  # Studio Ghibli
        id_pais_origem=3,          # Japão
        orcamento=24000000,
        duracao=time(2, 14, 0), 
        sinopse="Um jovem príncipe se envolve em uma guerra entre os deuses da floresta e os humanos que consomem seus recursos.",
        ano=1997,
        poster="https://wallpapers.com/images/hd/princess-mononoke-studio-ghibli-k5rgqxp6lt9pne5p.jpg",
        banner="https://images8.alphacoders.com/139/1395597.png",
        trailer="https://youtu.be/4OiMOHRDs14",
        flag=True
    ),
    Filme(
        titulo="Se Beber, Não Case",
        id_produtora_principal=1,  # Warner Bros
        id_pais_origem=1,
        orcamento=35000000,
        duracao=time(1, 40, 0),
        sinopse="Três amigos tentam encontrar o noivo desaparecido em Las Vegas após uma louca despedida de solteiro sem memórias.",
        ano=2009,
        poster="https://cinema-em-cena.nyc3.cdn.digitaloceanspaces.com/reviews/408/m0tQyMdp3fy5ooUOQkJMd1fQKBJ.jpg",
        banner="https://images2.alphacoders.com/710/thumb-1920-710559.jpg",
        trailer="https://youtu.be/jOQMBfWMMsU",
        flag=True
    ),
    Filme(
        titulo="Titanic",
        id_produtora_principal=13,  # CORRIGIDO: Paramount Pictures
        id_pais_origem=1,
        orcamento=200000000,
        duracao=time(3, 14, 0),
        sinopse="Dois jovens de classes sociais diferentes se apaixonam a bordo do fatídico e luxuoso navio RMS Titanic.",
        ano=1997,
        poster="https://i.pinimg.com/originals/44/55/d9/4455d96357fb041d1cf3c8a5264ed593.jpg",
        banner="https://images7.alphacoders.com/134/thumb-1920-1341932.jpg",
        trailer="https://youtu.be/IH6_CA_ocqY",
        flag=True
    ),
    Filme(
        titulo="Homem de Ferro",
        id_produtora_principal=3,  # Marvel Studios
        id_pais_origem=1,
        orcamento=140000000,
        duracao=time(2, 6, 0),
        sinopse="Um bilionário industrial e genial inventor constrói uma armadura de alta tecnologia após ser mantido em cativeiro.",
        ano=2008,
        poster="https://br.web.img3.acsta.net/medias/nmedia/18/91/79/19/20163665.jpg",
        banner="https://images4.alphacoders.com/818/thumb-1920-81856.jpg",
        trailer="https://youtu.be/8ugaeA-nMTc",
        flag=True
    ),
    Filme(
        titulo="Pulp Fiction",
        id_produtora_principal=2,  # Universal Pictures
        id_pais_origem=1,
        orcamento=8000000,
        duracao=time(2, 34, 0),
        sinopse="As vidas de dois assassinos de aluguel, uma esposa de gângster, um boxeador e dois assaltantes se cruzam em histórias violentas.",
        ano=1994,
        poster="https://m.media-amazon.com/images/I/71e+s01VVJL._AC_UF1000,1000_QL80_.jpg",
        banner="https://images2.alphacoders.com/867/thumb-1920-86710.jpg",
        trailer="https://youtu.be/tGpTpVyI_OQ",
        flag=True
    ),
    Filme(
        titulo="Parasita",
        id_produtora_principal=2,  # Universal Pictures (distribuidora internacional)
        id_pais_origem=4,          # Coreia do Sul
        orcamento=11400000,
        duracao=time(2, 12, 0),
        sinopse="Uma família desempregada infiltra-se astutamente na rotina de uma rica família de Seul, gerando consequências imprevisíveis.",
        ano=2019,
        poster="https://m.media-amazon.com/images/I/81io9SYH5dL.jpg",
        banner="https://images.alphacoders.com/108/thumb-1920-1082781.jpg",
        trailer="https://youtu.be/m4jfE-TxC24",
        flag=True
    ),
    Filme(
        titulo="Mad Max: Estrada da Fúria",
        id_produtora_principal=1,  # Warner Bros
        id_pais_origem=9,          # Austrália
        orcamento=150000000,
        duracao=time(2, 0, 0), 
        sinopse="Em um mundo pós-apocalíptico, uma guerreira rebelde e um andarilho tentam escapar do controle de um tirano implacável.",
        ano=2015,
        poster="https://m.media-amazon.com/images/M/MV5BZDJkNzQ2ZGMtZmI5YS00NzUxLThmNGEtZmE2OWY0MzE1NGM3XkEyXkFqcGc@._V1_.jpg",
        banner="https://images4.alphacoders.com/589/thumb-1920-589037.jpg",
        trailer="https://youtu.be/IVmf82obaaA",
        flag=True
    ),
    Filme(
        titulo="La La Land",
        id_produtora_principal=5,  # CORRIGIDO: Columbia Pictures (distribuidora real)
        id_pais_origem=1,
        orcamento=30000000,
        duracao=time(2, 8, 0), 
        sinopse="Um pianista de jazz e uma aspirante a atriz tentam conciliar suas ambições profissionais com o amor em Los Angeles.",
        ano=2016,
        poster="https://wallpapercave.com/wp/wp8872315.jpg",
        banner="https://images.alphacoders.com/772/thumb-1920-772841.jpg",
        trailer="https://youtu.be/0KpWc-cwQtY",
        flag=True
    ),
    Filme(
        titulo="The Batman",
        id_produtora_principal=12,  # DC Studios
        id_pais_origem=1,
        orcamento=200000000,
        duracao=time(2, 56, 0),
        sinopse="Batman persegue o Charada, um assassino que mata a elite corrupta de Gotham e deixa enigmas.",
        ano=2022,
        poster="https://cdnb.artstation.com/p/assets/images/images/066/743/321/large/piyush-kumar-the-batman.jpg?1693658435",
        banner="https://images6.alphacoders.com/127/thumb-1920-1273903.jpg",
        trailer="https://youtu.be/rsQEor4y2hg",
        flag=True
    ),
]

db.add_all(filmes)
db.commit()

destaques = [
    DestaqueHome(id_filme=1,  ordem=1),  # Interestelar
    DestaqueHome(id_filme=2,  ordem=2),  # LOTR
    DestaqueHome(id_filme=8,  ordem=3),  # Homem de Ferro
    DestaqueHome(id_filme=10, ordem=4),  # Parasita
    DestaqueHome(id_filme=13, ordem=5),  # The Batman
]

db.add_all(destaques)
db.commit()

filme_categorias = [
    FilmeCategoria(id_filme=1,  id_categoria=3),   # Interestelar -> Ficção Científica

    FilmeCategoria(id_filme=2,  id_categoria=2),   # LOTR -> Aventura
    FilmeCategoria(id_filme=2,  id_categoria=13),  # CORRIGIDO: Fantasia (era 4=Drama)

    FilmeCategoria(id_filme=3,  id_categoria=4),   # Forrest Gump -> Drama

    FilmeCategoria(id_filme=4,  id_categoria=5),   # O Iluminado -> Terror

    FilmeCategoria(id_filme=5,  id_categoria=6),   # Mononoke -> Animação
    FilmeCategoria(id_filme=5,  id_categoria=2),   # Aventura

    FilmeCategoria(id_filme=6,  id_categoria=7),   # Se Beber Não Case -> Comédia

    FilmeCategoria(id_filme=7,  id_categoria=8),   # Titanic -> Romance
    FilmeCategoria(id_filme=7,  id_categoria=4),   # Drama

    FilmeCategoria(id_filme=8,  id_categoria=9),   # Homem de Ferro -> Super-herói
    FilmeCategoria(id_filme=8,  id_categoria=1),   # Ação

    FilmeCategoria(id_filme=9,  id_categoria=10),  # Pulp Fiction -> Crime

    FilmeCategoria(id_filme=10, id_categoria=11),  # Parasita -> Suspense
    FilmeCategoria(id_filme=10, id_categoria=4),   # Drama

    FilmeCategoria(id_filme=11, id_categoria=1),   # Mad Max -> Ação
    FilmeCategoria(id_filme=11, id_categoria=2),   # Aventura

    FilmeCategoria(id_filme=12, id_categoria=12),  # La La Land -> Musical
    FilmeCategoria(id_filme=12, id_categoria=8),   # Romance

    FilmeCategoria(id_filme=13, id_categoria=9),   # The Batman -> Super-herói
    FilmeCategoria(id_filme=13, id_categoria=10),  # Crime
]

db.add_all(filme_categorias)
db.commit()

filme_diretores = [
    FilmeDiretor(id_filme=1,  id_diretor=1),   # Interestelar -> Nolan
    FilmeDiretor(id_filme=2,  id_diretor=2),   # LOTR -> Jackson
    FilmeDiretor(id_filme=3,  id_diretor=3),   # Forrest Gump -> Zemeckis
    FilmeDiretor(id_filme=4,  id_diretor=4),   # O Iluminado -> Kubrick
    FilmeDiretor(id_filme=5,  id_diretor=5),   # Mononoke -> Miyazaki
    FilmeDiretor(id_filme=6,  id_diretor=6),   # Se Beber Não Case -> Phillips
    FilmeDiretor(id_filme=7,  id_diretor=7),   # Titanic -> Cameron
    FilmeDiretor(id_filme=8,  id_diretor=8),   # Homem de Ferro -> Favreau
    FilmeDiretor(id_filme=9,  id_diretor=9),   # Pulp Fiction -> Tarantino
    FilmeDiretor(id_filme=10, id_diretor=10),  # Parasita -> Bong Joon-ho
    FilmeDiretor(id_filme=11, id_diretor=11),  # Mad Max -> Miller
    FilmeDiretor(id_filme=12, id_diretor=12),  # La La Land -> Chazelle
    FilmeDiretor(id_filme=13, id_diretor=13),  # The Batman -> Reeves
]

db.add_all(filme_diretores)
db.commit()

filme_atores = [
    FilmeAtor(id_filme=1,  id_ator=1),   # Interestelar -> McConaughey
    FilmeAtor(id_filme=1,  id_ator=2),   # Interestelar -> Hathaway

    FilmeAtor(id_filme=2,  id_ator=3),   # LOTR -> Elijah Wood

    FilmeAtor(id_filme=3,  id_ator=4),   # Forrest Gump -> Tom Hanks

    FilmeAtor(id_filme=4,  id_ator=5),   # O Iluminado -> Jack Nicholson

    FilmeAtor(id_filme=5,  id_ator=6),   # Mononoke -> Yoji Matsuda

    FilmeAtor(id_filme=6,  id_ator=7),   # Se Beber Não Case -> Bradley Cooper

    FilmeAtor(id_filme=7,  id_ator=8),   # Titanic -> Leonardo DiCaprio

    FilmeAtor(id_filme=8,  id_ator=9),   # Homem de Ferro -> Robert Downey Jr.
    FilmeAtor(id_filme=8,  id_ator=15),  # Homem de Ferro -> Scarlett Johansson

    FilmeAtor(id_filme=9,  id_ator=10),  # Pulp Fiction -> John Travolta

    FilmeAtor(id_filme=10, id_ator=11),  # Parasita -> Song Kang-ho

    FilmeAtor(id_filme=11, id_ator=12),  # Mad Max -> Tom Hardy

    FilmeAtor(id_filme=12, id_ator=13),  # La La Land -> Ryan Gosling
    FilmeAtor(id_filme=12, id_ator=14),  # La La Land -> Emma Stone

    FilmeAtor(id_filme=13, id_ator=16),  # The Batman -> Robert Pattinson
]

db.add_all(filme_atores)
db.commit()

filme_linguagens = [
    FilmeLinguagem(id_filme=1,  id_linguagem=1),  # Interestelar -> Inglês
    FilmeLinguagem(id_filme=2,  id_linguagem=1),  # LOTR -> Inglês
    FilmeLinguagem(id_filme=3,  id_linguagem=1),  # Forrest Gump -> Inglês
    FilmeLinguagem(id_filme=4,  id_linguagem=1),  # O Iluminado -> Inglês
    FilmeLinguagem(id_filme=5,  id_linguagem=3),  # Mononoke -> Japonês
    FilmeLinguagem(id_filme=6,  id_linguagem=1),  # Se Beber Não Case -> Inglês
    FilmeLinguagem(id_filme=7,  id_linguagem=1),  # Titanic -> Inglês
    FilmeLinguagem(id_filme=8,  id_linguagem=1),  # Homem de Ferro -> Inglês
    FilmeLinguagem(id_filme=9,  id_linguagem=1),  # Pulp Fiction -> Inglês
    FilmeLinguagem(id_filme=10, id_linguagem=4),  # Parasita -> Coreano
    FilmeLinguagem(id_filme=11, id_linguagem=1),  # Mad Max -> Inglês
    FilmeLinguagem(id_filme=12, id_linguagem=1),  # La La Land -> Inglês  # CORRIGIDO: removido Português
    FilmeLinguagem(id_filme=13, id_linguagem=1),  # The Batman -> Inglês
]

db.add_all(filme_linguagens)
db.commit()

filme_paises = [
    FilmePais(id_filme=1,  id_pais=1),   # Interestelar -> EUA
    FilmePais(id_filme=2,  id_pais=10),  # LOTR -> Nova Zelândia
    FilmePais(id_filme=3,  id_pais=1),   # Forrest Gump -> EUA
    FilmePais(id_filme=4,  id_pais=1),   # O Iluminado -> EUA
    FilmePais(id_filme=5,  id_pais=3),   # Mononoke -> Japão
    FilmePais(id_filme=6,  id_pais=1),   # Se Beber Não Case -> EUA
    FilmePais(id_filme=7,  id_pais=1),   # Titanic -> EUA
    FilmePais(id_filme=8,  id_pais=1),   # Homem de Ferro -> EUA
    FilmePais(id_filme=9,  id_pais=1),   # Pulp Fiction -> EUA
    FilmePais(id_filme=10, id_pais=4),   # Parasita -> Coreia do Sul
    FilmePais(id_filme=11, id_pais=9),   # Mad Max -> Austrália
    FilmePais(id_filme=12, id_pais=1),   # La La Land -> EUA
    FilmePais(id_filme=13, id_pais=1),   # The Batman -> EUA
]

db.add_all(filme_paises)
db.commit()

filme_produtoras = [
    FilmeProdutora(id_filme=1,  id_produtora=13),  # Interestelar -> Paramount  # CORRIGIDO
    FilmeProdutora(id_filme=1,  id_produtora=9),   # Interestelar -> Legendary Pictures
    FilmeProdutora(id_filme=2,  id_produtora=1),   # LOTR -> Warner Bros
    FilmeProdutora(id_filme=3,  id_produtora=13),  # Forrest Gump -> Paramount  # CORRIGIDO
    FilmeProdutora(id_filme=4,  id_produtora=1),   # O Iluminado -> Warner Bros
    FilmeProdutora(id_filme=5,  id_produtora=6),   # Mononoke -> Studio Ghibli
    FilmeProdutora(id_filme=6,  id_produtora=1),   # Se Beber Não Case -> Warner Bros  # CORRIGIDO: alinhado com id_produtora_principal
    FilmeProdutora(id_filme=7,  id_produtora=13),  # Titanic -> Paramount  # CORRIGIDO
    FilmeProdutora(id_filme=7,  id_produtora=4),   # Titanic -> 20th Century Studios
    FilmeProdutora(id_filme=8,  id_produtora=3),   # Homem de Ferro -> Marvel Studios
    FilmeProdutora(id_filme=9,  id_produtora=2),   # Pulp Fiction -> Universal Pictures
    FilmeProdutora(id_filme=10, id_produtora=8),   # Parasita -> A24 (distribuição EUA)
    FilmeProdutora(id_filme=11, id_produtora=9),   # Mad Max -> Legendary Pictures
    FilmeProdutora(id_filme=12, id_produtora=5),   # La La Land -> Columbia Pictures
    FilmeProdutora(id_filme=13, id_produtora=12),  # The Batman -> DC Studios
]

db.add_all(filme_produtoras)
db.commit()

print("Banco populado com sucesso!")