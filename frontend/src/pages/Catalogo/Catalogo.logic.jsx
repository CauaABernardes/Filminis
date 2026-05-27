import { useEffect, useRef, useState } from 'react';
import { dadosService } from '../../services/api';

// Slides do carrossel com cortinas (hardcoded como no Figma)
export const RECOMENDADOS_SLIDES = [
  {
    id: 1,
    poster: 'https://m.media-amazon.com/images/M/MV5BYjRmODgyMWItMWQzOS00NTY3LWI0ZTAtMzgxYzQwODM0YmViXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
    titulo: 'Raging Bull',
    quote: '"puta que pariu" - senhor cinema',
    diretor: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Martin_Scorsese_2010.jpg/440px-Martin_Scorsese_2010.jpg',
  },
  {
    id: 2,
    poster: 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    titulo: 'Um Sonho de Liberdade',
    quote: '"uma obra-prima atemporal"',
    diretor: null,
  },
  {
    id: 3,
    poster: 'https://m.media-amazon.com/images/M/MV5BNmU5ZGNjODMtMTMwYy00YTZlLTg3ZTgtMzg4ZGU1NmMwZTNiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    titulo: 'Tropa de Elite',
    quote: '"cinema nacional no seu melhor"',
    diretor: null,
  },
  {
    id: 4,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3MV5BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_.jpg',
    titulo: 'Interestelar',
    quote: '"épico e emocionante"',
    diretor: null,
  },
];

// Seções dinâmicas do catálogo — mapeadas por nome de categoria/produtora
const SECOES_CONFIG = [
  { titulo: 'Recomendados do Sr. Cinema', categorias: ['Drama', 'Crime'] },
  { titulo: 'Melhores Obras Audiovisuais', categorias: ['Drama', 'Ficção Científica'] },
  { titulo: 'Universo Marvel',             produtoras: ['Marvel Studios'] },
  { titulo: 'Universo DC',                 produtoras: ['Warner Bros.'] },
  { titulo: 'Animações',                   categorias: ['Animação'] },
  { titulo: 'Terror & Suspense',           categorias: ['Terror'] },
  { titulo: 'Adicionados Recentemente',    params: { limit: 20 } },
  { titulo: 'Próximos Lançamentos',        params: { limit: 10 } },
];

export function useCatalogo() {
  const [slide, setSlide]   = useState(0);
  const [secoes, setSecoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % RECOMENDADOS_SLIDES.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    Promise.all([dadosService.categorias(), dadosService.produtoras()])
      .then(([{ data: cats }, { data: prods }]) => {
        setCategorias(cats);

        const montadas = SECOES_CONFIG.map((cfg) => {
          const params = { limit: 20, aprovados: true };
          if (cfg.categorias) {
            const id = cats.find((c) => cfg.categorias.includes(c.nome))?.id_categoria;
            if (id) params.categoria = id;
          }
          if (cfg.produtoras) {
            const id = prods.find((p) => cfg.produtoras.includes(p.nome))?.id_produtora;
            if (id) params.produtora = id;
          }
          if (cfg.params) Object.assign(params, cfg.params);
          return { titulo: cfg.titulo, params };
        });

        setSecoes(montadas);
      })
      .catch(() => {});
  }, []);

  const prev = () => setSlide((s) => (s - 1 + RECOMENDADOS_SLIDES.length) % RECOMENDADOS_SLIDES.length);
  const next = () => setSlide((s) => (s + 1) % RECOMENDADOS_SLIDES.length);

  return { slide, setSlide, prev, next, secoes, categorias };
}
