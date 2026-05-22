import { useNavigate } from 'react-router-dom';
import FilmeCard from '../FilmeCard/FilmeCard';
import s from './CarrosselSecao.module.css';
import { useCarrosselSecao } from './CarrosselSecao.logic';

export default function CarrosselSecao({ titulo, params, filmes: fixos, filtroUrl }) {
  const { filmes, loading, trackRef, scroll } = useCarrosselSecao({ params, filmes: fixos });
  const navigate = useNavigate();

  if (!loading && filmes.length === 0) return null;

  return (
    <section className={s.secao}>
      <div className={s.header}>
        <h2 className={s.titulo}>{titulo}</h2>
        {filtroUrl && <span className={s.verTodos} onClick={() => navigate(filtroUrl)}>Ver todos →</span>}
      </div>

      <div className={s.wrapper}>
        <button className={`${s.arrow} ${s.arrowL}`} onClick={() => scroll(-1)}>‹</button>
        <div className={s.track} ref={trackRef}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <div key={i} className={s.skel} />)
            : filmes.map((f) => <FilmeCard key={f.id_filme} filme={f} />)
          }
        </div>
        <button className={`${s.arrow} ${s.arrowR}`} onClick={() => scroll(1)}>›</button>
      </div>
    </section>
  );
}
