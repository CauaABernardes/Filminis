import { Link } from 'react-router-dom';
import s from './Navbar.module.css';
import { useNavbar } from './Navbar.logic';

export default function Navbar() {
  const { user, isAdmin, busca, setBusca, handleBusca, menuAberto, setMenuAberto, isActive, handleLogout } = useNavbar();

  return (
    <nav className={s.navbar}>
      <Link to="/" className={s.brand}>
        <div className={s.brandIcon}>🎬</div>
        Sr. Movies
      </Link>

      <ul className={s.links}>
        <li><Link to="/"        className={isActive('/')        ? s.active : ''}>Início</Link></li>
        <li><Link to="/catalogo" className={isActive('/catalogo') ? s.active : ''}>Catálogo</Link></li>
        <li><Link to="/sugestao" className={isActive('/sugestao') ? s.active : ''}>Sugestões</Link></li>
      </ul>

      <div className={s.searchBox}>
        <span className={s.searchIcon}>🔍</span>
        <input
          placeholder="Pesquise filmes aqui"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={handleBusca}
        />
      </div>

      <div className={s.avatarWrap}>
        <button className={s.avatar} onClick={() => setMenuAberto((v) => !v)}>
          👤
        </button>

        {menuAberto && (
          <div className={s.dropdown}>
            {user ? (
              <>
                <span className={s.ddItem} style={{ cursor: 'default', color: 'var(--muted)', fontSize: '0.8rem' }}>
                  {user.nome}{isAdmin && <span className={s.adminBadge}>ADMIN</span>}
                </span>
                <div className={s.ddDivider} />
                {isAdmin && <Link to="/admin" className={s.ddItem} onClick={() => setMenuAberto(false)}>⚙️ Painel Admin</Link>}
                <button className={`${s.ddItem} ${s.danger}`} onClick={handleLogout}>Sair</button>
              </>
            ) : (
              <>
                <Link to="/login"    className={s.ddItem} onClick={() => setMenuAberto(false)}>Entrar</Link>
                <Link to="/cadastro" className={s.ddItem} onClick={() => setMenuAberto(false)}>Cadastrar</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}