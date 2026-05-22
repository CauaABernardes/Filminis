import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CarrosselSecao from '../../components/CarrosselSecao/CarrosselSecao';
import s from './Home.module.css';
import { HERO_SLIDES, NOTICIAS, useHome } from './Home.logic';

export default function Home() {
  const { slide, setSlide, prev, next } = useHome();

  return (
    <div className={s.page}>
      <Navbar />

      {/* Hero collage */}
      <div className={s.hero}>
        {HERO_SLIDES.map((sl, i) => (
          <div key={sl.id} className={`${s.slide} ${i === slide ? s.active : ''}`}>
            {sl.posters.map((url, j) => (
              <img key={j} src={url} alt="" />
            ))}
          </div>
        ))}

        <div className={s.overlay}>
          <h1 className={s.label}>{HERO_SLIDES[slide].label}</h1>
        </div>

        <button className={`${s.heroArrow} ${s.heroArrowL}`} onClick={prev}>‹</button>
        <button className={`${s.heroArrow} ${s.heroArrowR}`} onClick={next}>›</button>

        <div className={s.heroDots}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`${s.dot} ${i === slide ? s.active : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      <div className={s.content}>
        <CarrosselSecao titulo="Próximos Lançamentos"    params={{ limit: 20 }} filtroUrl="/filmes" />
        <CarrosselSecao titulo="Adicionados Recentemente" params={{ limit: 20 }} filtroUrl="/filmes" />

        {/* Notícias */}
        <h2 className={s.secTitle}>Notícias</h2>
        {NOTICIAS.map((n) => (
          <div key={n.id} className={s.noticia}>
            <img className={s.noticiaImg} src={n.imagem} alt={n.titulo} />
            <div className={s.noticiaBody}>
              <h3>{n.titulo}</h3>
              <p>{n.texto}</p>
              <span className={s.lerMais}>Ler Mais +</span>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
