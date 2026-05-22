import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className={s.col}>
          <a href="#sobre">Sobre Nós</a>
          <a href="#colabore">Colabore conosco</a>
          <a href="/cadastro">Seja um Absolute</a>
        </div>
        <div className={s.col}>
          <h4>Contato:</h4>
          <p>contato.srmovies@outlook.com</p>
          <p>(19) 3271-4057</p>
          <p>(19) 9191-0880</p>
        </div>
        <div className={s.col}>
          <h4>Siga-nos:</h4>
          <div className={s.social}>
            <a href="#ig"  aria-label="Instagram">📸</a>
            <a href="#fb"  aria-label="Facebook">📘</a>
            <a href="#ttv" aria-label="Twitch">🎮</a>
          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <p>Copyright © 2026 por Sr. Movies.</p>
        <p>Todos os direitos reservados. Nenhuma parte deste site pode ser reproduzida, distribuída ou transmitida por qualquer forma ou meio, incluindo capturas de tela, gravação ou outros métodos eletrônicos ou mecânicos, sem a autorização prévia por escrito do detentor dos direitos, exceto em casos de citações breves permitidas pela lei de direitos autorais.</p>
      </div>
    </footer>
  );
}
