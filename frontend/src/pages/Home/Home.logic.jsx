import { useEffect, useRef, useState } from 'react';
import { homeService } from '../../services/api';

// Grade de pôsteres do hero da Home (collage de filmes)
export const HERO_SLIDES = [
  {
    id: 1,
    label: 'O SUPRASSUMO DA SÉTIMA ARTE',
    posters: [
      'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg',
      'https://m.media-amazon.com/images/I/71xDtUSyAKL.jpg',
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      'https://br.web.img3.acsta.net/medias/nmedia/18/87/02/76/19871246.jpg',
      'https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-04113-d54ce739355725fcd817446554592974-1024-1024.webp',
    ],
  },
  {
    id: 2,
    label: 'CLÁSSICOS IMORTAIS',
    posters: [
      'https://i.ebayimg.com/images/g/gnEAAOSwP~tW4HMS/s-l1200.jpg',
      'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_.jpg',
      'https://br.web.img3.acsta.net/pictures/15/05/14/21/14/504650.jpg',
      'https://m.media-amazon.com/images/S/pv-target-images/36130eca001baf033aaff6778b21abf5bcfa0d16f944074c07e5e28da7f792bc.jpg',
      'https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_.jpg',
    ],
  },
  {
    id: 3,
    label: 'AÇÃO E ADRENALINA',
    posters: [
      'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg',
      'https://ingresso-a.akamaihd.net/img/cinema/cartaz/18869-cartaz.jpg',
      'https://http2.mlstatic.com/D_NQ_NP_834587-CBT93262121091_092025-O.webp',
      'https://acdn-us.mitiendanube.com/stores/363/165/products/il_794xn-3673741173_8tds1-2fe37b9cea6275587016511077101371-640-0.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7CZryBjCZJ98BsooNxb1Jpnyz2916RwGzA&s',
      'https://br.web.img2.acsta.net/pictures/15/03/03/22/36/487707.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp9_9vdIb6rBxxqoNXPsaHEodPprdHC3YVsQ&s',
    ],
  },
  {
    id: 4,
    label: 'FICÇÃO CIENTÍFICA',
    posters: [
      'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
      'https://image.tmdb.org/t/p/w220_and_h330_face/cdys21q6ohjpKECqXDrdrjnPV3.jpg',
      'https://br.web.img3.acsta.net/r_1280_720/img/8f/64/8f642a9e7b4f4208e86637eebf4ad1ae.jpg',
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZjRDKw4hsQk5G8DK3HuFX6sPSVcUahvwkfhPPTF5g140F6xRX9V97hEEOoWnuTrgN-gyqndGqdI2kTQ73EywR6xhthfKaamTZXbNGfqOexYL9VNM_HhPNaLAmEkKXNmNIoewft5JAkOoj/w437-h640/E-xdddtWQAQ3YLh.jpg',
      'https://m.media-amazon.com/images/M/MV5BNjAxYjgwMzktMGM1NS00ODczLTkwZTUtMzBkNmI3MWNlNzkwXkEyXkFqcGc@._V1_.jpg',
      'https://br.web.img2.acsta.net/r_1280_720/medias/nmedia/18/90/69/66/20108908.jpg',
      'https://www.indopraorlando.com.br/wp-content/uploads/2024/06/ROMULUS_INSTAGRAM_PAYOFF_POSTER_BRAZIL_Easy-Resize.com_.jpg',
    ],
  },
];

export const NOTICIAS = [
  {
    id: 1,
    titulo: 'Homem-Aranha: Além do Aranhaverso Adiado novamente?',
    texto: 'O lançamento de Homem-Aranha: Além do Aranhaverso foi adiado de março de 2024 para o dia 18 de junho de 2027. Essa mudança ocorreu principalmente devido aos atrasos causados pelas greves em Hollywood e...',
    imagem: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
  },
  {
    id: 2,
    titulo: 'Estrelas de Hollywood assinam carta aberta contra fusão de Paramount e Warner Bros.',
    texto: 'Mais de mil cineastas, atores e profissionais do setor assinaram uma carta aberta em oposição à proposta de fusão de US$ 110 bilhões da Warner Bros. Discovery com a Paramount Skydance, alertando que ela reduziria a concorrência e ...',
    imagem: 'https://cdn.pipocamoderna.com.br/wp-content/uploads/2025/09/Paramount-Warner-Bros-water-tower.jpg.webp',
  },
  {
    id: 3,
    titulo: "Personagem icônico é confirmado em 'Todo Mundo em Pânico 6'",
    texto: "Poucas semanas após os irmãos Keenen, Shawn e Marlon Wayans serem confirmados no sexto filme de 'Todo Mundo em Pânico', o projeto voltou a receber atualizações. Em entrevista ao canal do Youtube Crazydog500, Dave Sheridan ('O Pequenino'), ...",
    imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/10/todo-mundo-em-panico-e1730323839101.jpg?w=1080&h=608&crop=1',
  },
];

// Hook que busca os destaques da Home da API
export function useDestaques() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homeService.destaques()
      .then(({ data }) => setFilmes(data.map((d) => d.filme)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { filmes, loading };
}

export function useHome() {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const prev = () => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setSlide((s) => (s + 1) % HERO_SLIDES.length);

  return { slide, setSlide, prev, next };
}
