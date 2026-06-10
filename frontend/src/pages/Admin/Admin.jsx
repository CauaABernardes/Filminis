import Navbar from '../../components/Navbar/Navbar';
import { useAdmin } from './Admin.logic';
import s from './Admin.module.css';

export default function Admin() {
  const {
    aba, setAba,
    filmesPendentes, loadingFilmes,
    usuarios, loadingUsuarios,
    aprovar, negar,
    tornarAdmin, rebaixar,
    confirmando, setConfirmando,
  } = useAdmin();

  return (
    <div className={s.page}>
      <Navbar />

      <div className={s.inner}>
        <h1 className={s.titulo}>Painel Admin</h1>

        <div className={s.abas}>
          <button
            className={`${s.aba} ${aba === 'filmes' ? s.abaAtiva : ''}`}
            onClick={() => setAba('filmes')}
          >
            Filmes Pendentes
            {filmesPendentes.length > 0 && (
              <span className={s.badge}>{filmesPendentes.length}</span>
            )}
          </button>
          <button
            className={`${s.aba} ${aba === 'usuarios' ? s.abaAtiva : ''}`}
            onClick={() => setAba('usuarios')}
          >
           Usuários
          </button>
        </div>

        {aba === 'filmes' && (
          <section>
            {loadingFilmes ? (
              <p className={s.vazio}>Carregando...</p>
            ) : filmesPendentes.length === 0 ? (
              <div className={s.vazioBox}>
                <span className={s.vazioIcon}>✅</span>
                <p>Nenhum filme aguardando aprovação.</p>
              </div>
            ) : (
              <div className={s.listaFilmes}>
                {filmesPendentes.map((f) => (
                  <div key={f.id_filme} className={s.filmeCard}>
                    <div className={s.posterWrap}>
                      {f.poster ? (
                        <img src={f.poster} alt={f.titulo} className={s.poster} />
                      ) : (
                        <div className={s.posterPlaceholder}>🎬</div>
                      )}
                    </div>

                    <div className={s.filmeInfo}>
                      <h3 className={s.filmeTitulo}>{f.titulo}</h3>
                      {f.titulo_original && (
                        <p className={s.filmeSub}>{f.titulo_original}</p>
                      )}
                      <div className={s.filmeMeta}>
                        {f.ano         && <span>{f.ano}</span>}
                        {f.duracao     && <span>{f.duracao} min</span>}
                        {f.pais?.nome  && <span>{f.pais.nome}</span>}
                      </div>
                      {f.sinopse && (
                        <p className={s.sinopse}>{f.sinopse}</p>
                      )}
                      <p className={s.sugeridoPor}>
                        Sugerido por: <strong>{f.usuario?.apelido ?? f.usuario?.nome ?? '—'}</strong>
                      </p>
                    </div>

                    <div className={s.acoes}>
                      <button
                        className={s.btnAprovar}
                        onClick={() => aprovar(f.id_filme)}
                        disabled={confirmando === `aprovar-${f.id_filme}`}
                      >
                        {confirmando === `aprovar-${f.id_filme}` ? '...' : '✓ Aprovar'}
                      </button>

                      {confirmando === `negar-${f.id_filme}` ? (
                        <div className={s.confirmarNegar}>
                          <p>Excluir permanentemente?</p>
                          <div className={s.confirmarBtns}>
                            <button className={s.btnPerigo} onClick={() => negar(f.id_filme)}>Sim, excluir</button>
                            <button className={s.btnGhost} onClick={() => setConfirmando(null)}>Cancelar</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className={s.btnNegar}
                          onClick={() => setConfirmando(`negar-${f.id_filme}`)}
                        >
                          ✕ Negar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {aba === 'usuarios' && (
          <section>
            {loadingUsuarios ? (
              <p className={s.vazio}>Carregando...</p>
            ) : (
              <div className={s.tabelaWrap}>
                <table className={s.tabela}>
                  <thead>
                    <tr>
                      <th>Usuário</th>
                      <th>Email</th>
                      <th>Desde</th>
                      <th>Role</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id_usuario}>
                        <td>
                          <div className={s.userCell}>
                            {u.imagem ? (
                              <img src={u.imagem} alt={u.nome} className={s.userAvatar} />
                            ) : (
                              <div className={s.userAvatarFallback}>
                                {u.nome?.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className={s.userName}>{u.nome}</p>
                              {u.apelido && <p className={s.userApelido}>@{u.apelido}</p>}
                            </div>
                          </div>
                        </td>
                        <td className={s.muted}>{u.email}</td>
                        <td className={s.muted}>
                          {u.data_criacao
                            ? new Date(u.data_criacao).toLocaleDateString('pt-BR')
                            : '—'}
                        </td>
                        <td>
                          <span className={`${s.roleBadge} ${u.role === 'admin' ? s.roleAdmin : s.roleUser}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          {confirmando === `admin-${u.id_usuario}` ? (
                            <div className={s.confirmarInline}>
                              <span>Tornar admin?</span>
                              <button className={s.btnSim} onClick={() => tornarAdmin(u.id_usuario)}>Sim</button>
                              <button className={s.btnGhost} onClick={() => setConfirmando(null)}>Não</button>
                            </div>
                          ) : confirmando === `rebaixar-${u.id_usuario}` ? (
                            <div className={s.confirmarInline}>
                              <span>Remover admin?</span>
                              <button className={s.btnPerigo} onClick={() => rebaixar(u.id_usuario)}>Sim</button>
                              <button className={s.btnGhost} onClick={() => setConfirmando(null)}>Não</button>
                            </div>
                          ) : u.role === 'admin' ? (
                            <button
                              className={s.btnGhost}
                              onClick={() => setConfirmando(`rebaixar-${u.id_usuario}`)}
                            >
                              Remover admin
                            </button>
                          ) : (
                            <button
                              className={s.btnPromover}
                              onClick={() => setConfirmando(`admin-${u.id_usuario}`)}
                            >
                              Tornar admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
