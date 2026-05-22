import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CarrosselSecao from '../../components/CarrosselSecao/CarrosselSecao';
import s from './Catalogo.module.css';
import { RECOMENDADOS_SLIDES, useCatalogo } from './Catalogo.logic';

// Ícones hardcoded das categorias (como no Figma)
const ICONES_CAT = { 'Ação': '🔫', 'Aventura': '🤠', 'Ficção Científica': '👽', 'Drama': '📺', 'Terror': '💀', 'Animação': '🎨', 'Comédia': '😂', 'Romance': '❤️', 'Super-herói': '🦸', 'Crime': '🕵️', 'Suspense': '😰', 'Musical': '🎵' };

export default function Catalogo() {
  const { slide, setSlide, prev, next, secoes, categorias } = useCatalogo();
  const navigate = useNavigate();

  return (
    <div className={s.page}>
      <Navbar />

      {/* Carrossel "RECOMENDAMOS" com cortinas */}
      <div className={s.heroWrap}>
        <div className={s.curtainL} />
        <div className={s.curtainR} />

        {RECOMENDADOS_SLIDES.map((sl, i) => (
          <div key={sl.id} className={`${s.slide} ${i === slide ? s.active : ''}`}>
            <span className={s.slideLabel}>RECOMENDAMOS</span>
            <img className={s.slidePoster} src={sl.poster} alt={sl.titulo} />
            <span className={s.slideQuote}>{sl.quote}</span>
          </div>
        ))}

        <button className={`${s.heroArrow} ${s.heroArrowL}`} onClick={prev}>‹</button>
        <button className={`${s.heroArrow} ${s.heroArrowR}`} onClick={next}>›</button>

        <div className={s.heroDots}>
          {RECOMENDADOS_SLIDES.map((_, i) => (
            <button key={i} className={`${s.dot} ${i === slide ? s.active : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      {/* Pills de categorias */}
      <div className={s.pills}>
        {categorias.map((c) => (
          <button key={c.id_categoria} className={s.pill} onClick={() => navigate(`/filmes?categoria=${c.id_categoria}`)}>
            <span>{ICONES_CAT[c.nome] || '🎬'}</span>
            {c.nome}
          </button>
        ))}
      </div>

      {/* Seções dinâmicas */}
      <div className={s.content}>
        {secoes.map((sec) => (
          <CarrosselSecao
            key={sec.titulo}
            titulo={sec.titulo}
            params={sec.params}
            filtroUrl="/filmes"
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
