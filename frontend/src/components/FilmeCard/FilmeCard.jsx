import { useNavigate } from 'react-router-dom';
import s from './FilmeCard.module.css';

export default function FilmeCard({ filme, modo = 'carrossel' }) {
  const navigate = useNavigate();
  const cls = modo === 'grade' ? s.cardGrade : s.card;

  const handleImgError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
  };

  return (
    <div className={cls} onClick={() => navigate(`/filmes/${filme.id_filme}`)}>
      {filme.poster ? (
        <>
          <img
            src={filme.poster}
            alt={filme.titulo}
            onError={handleImgError}
          />
          <div className={s.sem} style={{ display: 'none' }}>🎬<span>{filme.titulo}</span></div>
        </>
      ) : (
        <div className={s.sem}>🎬<span>{filme.titulo}</span></div>
      )}
      {modo === 'grade' && (
        <div className={s.info}>
          <div className={s.infoTitulo}>{filme.titulo}</div>
          <div className={s.infoAno}>{filme.ano}</div>
        </div>
      )}
    </div>
  );
}
