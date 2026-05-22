import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FilmeCard from '../../components/FilmeCard/FilmeCard';
import s from './TodosFilmes.module.css';
import { useTodosFilmes } from './TodosFilmes.logic';

export default function TodosFilmes() {
  const { filmes, loading, filtros, setFiltro, limpar, categorias, paises, anos, temFiltro } = useTodosFilmes();

  return (
    <div className={s.page}>
      <Navbar />
      <div className={s.inner}>

        {/* Filtros */}
        <div className={s.filtros}>
          <div className={s.filtroGrupo}>
            <label>Título</label>
            <input
              className={s.filtroInput}
              placeholder="Buscar por título..."
              value={filtros.titulo}
              onChange={(e) => setFiltro('titulo', e.target.value)}
            />
          </div>

          <div className={s.filtroGrupo}>
            <label>Categoria</label>
            <select className={s.filtroSelect} value={filtros.categoria} onChange={(e) => setFiltro('categoria', e.target.value)}>
              <option value="">Todas</option>
              {categorias.map((c) => <option key={c.id_categoria} value={c.id_categoria}>{c.nome}</option>)}
            </select>
          </div>

          <div className={s.filtroGrupo}>
            <label>Ano</label>
            <select className={s.filtroSelect} value={filtros.ano} onChange={(e) => setFiltro('ano', e.target.value)}>
              <option value="">Todos</option>
              {anos.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className={s.filtroGrupo}>
            <label>País</label>
            <select className={s.filtroSelect} value={filtros.pais} onChange={(e) => setFiltro('pais', e.target.value)}>
              <option value="">Todos</option>
              {paises.map((p) => <option key={p.id_pais} value={p.id_pais}>{p.nome}</option>)}
            </select>
          </div>

          {temFiltro && (
            <button className={s.btnLimpar} onClick={limpar}>✕ Limpar filtros</button>
          )}
        </div>

        {/* Cabeçalho */}
        <div className={s.header}>
          <h1>{filtros.titulo ? `Resultados para "${filtros.titulo}"` : 'Todos os Filmes'}</h1>
          {!loading && <span className={s.count}>{filmes.length} filme{filmes.length !== 1 ? 's' : ''}</span>}
        </div>

        {/* Grade */}
        <div className={s.grade}>
          {loading
            ? Array.from({ length: 20 }).map((_, i) => <div key={i} className={s.skel} />)
            : filmes.length === 0
              ? <div className={s.vazio}>Nenhum filme encontrado.</div>
              : filmes.map((f) => <FilmeCard key={f.id_filme} filme={f} modo="grade" />)
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
