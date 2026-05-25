import { useEffect, useRef, useState } from 'react';

// Todos os posters usam TMDB (permite hotlink, sem CORS)
export const HERO_SLIDES = [
  {
    id: 1,
    label: 'O SUPRASSUMO DA SÉTIMA ARTE',
    posters: [
      'https://image.tmdb.org/t3/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', // Fight Club
      'https://image.tmdb.org/t3/p/w342/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', // Pulp Fiction
      'https://image.tmdb.org/t3/p/w342/3bhkrj58Vtu7enYsLegHzgMm3Bg.jpg', // Godfather
      'https://image.tmdb.org/t3/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg', // Dark Knight
      'https://image.tmdb.org/t3/p/w342/9cqNxx0GxF0bAY7hT7PWzOwzR3P.jpg', // Shawshank
      'https://image.tmdb.org/t3/p/w342/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', // Gladiador
      'https://image.tmdb.org/t3/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', // Parasita
      'https://image.tmdb.org/t3/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', // Interstellar
    ],
  },
  {
    id: 2,
    label: 'CLÁSSICOS IMORTAIS',
    posters: [
      'https://image.tmdb.org/t3/p/w342/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', // Forrest Gump
      'https://image.tmdb.org/t3/p/w342/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg', // BTTF
      'https://image.tmdb.org/t3/p/w342/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg', // Jurassic Park
      'https://image.tmdb.org/t3/p/w342/ceG9VzoRAVGwivFU403Wc3AHRys.jpg', // Indiana Jones
      'https://image.tmdb.org/t3/p/w342/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', // Titanic
      'https://image.tmdb.org/t3/p/w342/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', // LOTR 1
      'https://image.tmdb.org/t3/p/w342/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', // LOTR 3
      'https://image.tmdb.org/t3/p/w342/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg', // Silence of Lambs
    ],
  },
  {
    id: 3,
    label: 'AÇÃO E ADRENALINA',
    posters: [
      'https://image.tmdb.org/t3/p/w342/78lPtwv72eTNqFW9COBF8l5eB8z.jpg', // Iron Man
      'https://image.tmdb.org/t3/p/w342/or06FN3Dka5tukK1e9sl16pB3iy.jpg', // Avengers Endgame
      'https://image.tmdb.org/t3/p/w342/fZPSd91vlGBP4PiExaFRtygULdN.jpg', // John Wick
      'https://image.tmdb.org/t3/p/w342/qvktm0BHcnmDpAB5q0bOvL4qEOC.jpg', // Terminator
      'https://image.tmdb.org/t3/p/w342/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', // Gladiador
      'https://image.tmdb.org/t3/p/w342/74xTEgt7R36Fpooo50r9T25onhq.jpg', // The Batman
      'https://image.tmdb.org/t3/p/w342/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg', // Guardians
      'https://image.tmdb.org/t3/p/w342/y1GJoRWGaMvgpkJy3Rl8Bc4LGZW.jpg', // Tropa de Elite
    ],
  },
  {
    id: 4,
    label: 'FICÇÃO CIENTÍFICA',
    posters: [
      'https://image.tmdb.org/t3/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', // Interstellar
      'https://image.tmdb.org/t3/p/w342/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', // Matrix
      'https://image.tmdb.org/t3/p/w342/d5NXSklpcvkCmqKOue0sBPxBPdG.jpg', // Duna
      'https://image.tmdb.org/t3/p/w342/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', // Duna 2
      'https://image.tmdb.org/t3/p/w342/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', // Blade Runner 2049
      'https://image.tmdb.org/t3/p/w342/ve72VxNqsuEngP0Ity4SB6K8QDBT.jpg', // 2001
      'https://image.tmdb.org/t3/p/w342/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg', // WALL-E
      'https://image.tmdb.org/t3/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', // Oppenheimer
    ],
  },
];

export const NOTICIAS = [
  {
    id: 1,
    titulo: 'Homem-Aranha: Além do Aranhaverso Adiado novamente?',
    texto: 'O lançamento de Homem-Aranha: Além do Aranhaverso foi adiado de março de 2024 para o dia 18 de junho de 2027. Essa mudança ocorreu principalmente devido aos atrasos causados pelas greves em Hollywood e...',
    imagem: 'https://image.tmdb.org/t3/p/w300/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  },
  {
    id: 2,
    titulo: 'Estrelas de Hollywood assinam carta aberta contra fusão de Paramount e Warner Bros.',
    texto: 'Mais de mil cineastas, atores e profissionais do setor assinaram uma carta aberta em oposição à proposta de fusão de US$ 110 bilhões da Warner Bros. Discovery com a Paramount Skydance, alertando que ela reduziria a concorrência e ...',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Warner_Bros._Archives.jpg/640px-Warner_Bros._Archives.jpg',
  },
  {
    id: 3,
    titulo: "Personagem icônico é confirmado em 'Todo Mundo em Pânico 6'",
    texto: "Poucas semanas após os irmãos Keenen, Shawn e Marlon Wayans serem confirmados no sexto filme de 'Todo Mundo em Pânico', o projeto voltou a receber atualizações. Em entrevista ao canal do Youtube Crazydog500, Dave Sheridan ('O Pequenino'), ...",
    imagem: 'https://image.tmdb.org/t3/p/w300/tQK2ForYzFCJvsT16YAsUhlvIwD.jpg',
  },
];

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
