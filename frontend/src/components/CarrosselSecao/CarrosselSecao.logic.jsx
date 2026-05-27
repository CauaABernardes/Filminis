import { useEffect, useRef, useState } from 'react';
import { filmesService } from '../../services/api';

const CARD_W = 110 + 12; // largura do card + gap
const VISIBLE = 4;

export function useCarrosselSecao({ params, filmes: fixos }) {
  const [filmes, setFilmes] = useState(fixos || []);
  const [loading, setLoading] = useState(!fixos);
  const trackRef = useRef(null);

  useEffect(() => {
    if (fixos) return;
    setLoading(true);
    filmesService.listar({ limit: 20, aprovados: true, ...params })
      .then(({ data }) => setFilmes(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [JSON.stringify(params)]);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * CARD_W * VISIBLE, behavior: 'smooth' });
  };

  return { filmes, loading, trackRef, scroll };
}
