import { useEffect, useRef, useState } from 'react';
import { homeService } from '../../services/api';

// Grade de pôsteres do hero da Home (collage de filmes)
export const HERO_SLIDES = [
  {
    id: 1,
    label: 'O SUPRASSUMO DA SÉTIMA ARTE',
    posters: [
      'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNTRmNTQ2M2ItMDYyYy00NWUzLTkxNGItZDUxZjgxYzRhYTdiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNDE3ODczM2QtZmMxZS00NmNhLWJmNDMtNjUxNTQ5OTAyMzliXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDJhZWMtODU5NS00N2QyLWI4NWEtNmM1ZmQ5NThjNmVlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    ],
  },
  {
    id: 2,
    label: 'CLÁSSICOS IMORTAIS',
    posters: [
      'https://m.media-amazon.com/images/M/MV5BYjRmODgyMWItMWQzOS00NTY3LWI0ZTAtMzgxYzQwODM0YmViXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BOGEwYTlkNzItNjU3OC00YjU4LWI4NzEtZjBkZjFmMzQ2ZjZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BODE0MjRhZWMtNTExMi00ZjhiLWIxOTMtODk3N2IxMzYxNDFjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
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
      'https://m.media-amazon.com/images/M/MV5BODEzNjczODgxMV5BMl5BanBnXkFtZTgwOTM1NDQ1ODE@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTQxOTc3NTMxMV5BMl5BanBnXkFtZTcwNzI4MDg2Mg@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTMwMDg3NDkxNF5BMl5BanBnXkFtZTcwODM1ODgyMQ@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTQ5NjQ1NDI3Ml5BMl5BanBnXkFtZTcwNDI4MDg2Mg@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNWVhZWFkZGItNmZkNS00MzYyLThjNzYtZjI2YWMxNmEzYWQzXkEyXkFqcGdeQXVyMzI2MDEwNA@@._V1_.jpg',
    ],
  },
  {
    id: 4,
    label: 'FICÇÃO CIENTÍFICA',
    posters: [
      'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVlLTM5YTctMTMwN2YwNzZlMDZhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMjkwMjY4NjE@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZTJlXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMzY2MDk5NDgtOWQ1My00YzBlLWJlMzMtMDkzNmI5ZmFjMzI5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5NS00YjQ4LWI4YTgtODE0NWZiYWFkNzM3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODA4MDg2Mg@@._V1_.jpg',
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
