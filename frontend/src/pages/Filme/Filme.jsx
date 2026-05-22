import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import s from './Filme.module.css';
import { useFilme } from './Filme.logic';
import { getBandeira } from '../../utils/helpers';

export default function Filme() {
  const { filme, loading, erro, handleSugestao, duracao, orcamento, bandeirasArr, bandeirasExtra, youtubeId } = useFilme();

  if (loading) return <div className={s.page}><Navbar /><div className={s.loading}>Carregando...</div></div>;
  if (erro)    return <div className={s.page}><Navbar /><div className={s.erro}>{erro}</div></div>;
  if (!filme)  return null;

  return (
    <div className={s.page}>
      <Navbar />

      {/* Banner */}
      {filme.banner
        ? <img className={s.banner} src={filme.banner} alt={filme.titulo} />
        : filme.poster
          ? <img className={s.banner} src={filme.poster} alt={filme.titulo} style={{ objectPosition: 'top' }} />
          : <div className={s.bannerPlaceholder}>🎬</div>
      }

      {/* Barra de título */}
      <div className={s.tituloBar}>
        <h1>{filme.titulo}</h1>
        {bandeirasArr[0] && (
          <span className={s.bandeiraPrincipal}>{getBandeira(bandeirasArr[0].nome)}</span>
        )}
        {filme.classificacao && (
          <span className={s.classificacao}>{filme.classificacao}</span>
        )}
      </div>

      {/* Trailer */}
      <div className={s.trailerWrap}>
        {youtubeId ? (
          <iframe
            className={s.trailerFrame}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className={s.trailerPlaceholder}>
            <button className={s.playBtn}>▶</button>
          </div>
        )}
      </div>

      <div className={s.inner}>

        {/* Linha 1: produtora | ícone | duração | ano */}
        <div className={s.infoRow}>
          {filme.produtoras?.[0] && (
            <span className={s.tag}>{filme.produtoras[0].nome}</span>
          )}
          <span className={s.tag}><span className={s.tagIcon}>🎬</span></span>
          {duracao  && <span className={s.tag}>{duracao}</span>}
          {filme.ano && <span className={s.tag}>{filme.ano}</span>}
        </div>

        {/* Linha 2: bandeiras + orçamento */}
        <div className={s.infoRow}>
          {bandeirasArr.length > 0 && (
            <div className={s.bandeirasRow}>
              {bandeirasArr.map((p) => (
                <span key={p.id_pais} title={p.nome}>{getBandeira(p.nome) ?? p.nome}</span>
              ))}
              {bandeirasExtra > 0 && <span className={s.extra}>+{bandeirasExtra}</span>}
            </div>
          )}
          {orcamento && <span className={s.tag}>{orcamento}</span>}
        </div>

        {/* Atores */}
        {filme.atores?.length > 0 && (
          <>
            <h2 className={s.secTitle}>Principais Atores/Atrizes</h2>
            <div className={s.atores}>
              {filme.atores.map((a) => (
                <div key={a.id_ator} className={s.atorCard}>
                  <div className={s.atorSem}>👤</div>
                  <div className={s.atorNome}>{a.nome}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Sinopse */}
        {filme.sinopse && (
          <div className={s.sinopse}>{filme.sinopse}</div>
        )}

        {/* Sugestão de edição */}
        <div className={s.sugestaoBox}>
          <p>Alguma informação errada?</p>
          <button className={s.sugestaoLink} onClick={handleSugestao}>
            Nos mande sua sugestão de edição!
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}
