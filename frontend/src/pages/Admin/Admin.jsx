import Navbar from '../../components/Navbar/Navbar';
import { useAdmin } from './Admin.logic';
import s from './Admin.module.css';

function ModalEdicao({
  filme, form, errors, erroModal, salvando,
  paises, produtoras, categorias, linguagens, atores, diretores,
  handleChange, toggleId, salvarEdicao, fecharModal,
}) {
  return (
    <div className={s.modalOverlay} onClick={fecharModal}>
      <div className={s.modalBox} onClick={e => e.stopPropagation()}>

        <div className={s.modalHeader}>
          <h2 className={s.modalTitulo}>Editar Filme</h2>
          <button className={s.modalFechar} onClick={fecharModal}>✕</button>
        </div>

        <div className={s.modalBody}>

          <div className={s.section}>
            <label className={s.label}>Banner do Filme</label>
            <div className={`${s.imagePreviewBox} ${form.banner ? s.hasImage : ''}`}>
              {form.banner
                ? <img src={form.banner} alt="Banner" className={s.bannerPreview} onError={e => e.target.style.display = 'none'} />
                : (
                  <div className={s.imagePlaceholder}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Banner do Filme</span>
                  </div>
                )
              }
            </div>
            <input className={s.input} type="url" name="banner" placeholder="https://..." value={form.banner} onChange={handleChange} />
          </div>

          {/* Trailer */}
          <div className={s.section}>
            <label className={s.label}>Link Trailer</label>
            <input className={s.input} type="url" name="trailer" placeholder="https://youtu.be/" value={form.trailer} onChange={handleChange} />
          </div>

          <div className={s.posterGrid}>
            <div className={s.posterCol}>
              <label className={s.label}>Poster do Filme</label>
              <div className={`${s.posterBox} ${form.poster ? s.hasImage : ''}`}>
                {form.poster
                  ? <img src={form.poster} alt="Poster" className={s.posterPreview} onError={e => e.target.style.display = 'none'} />
                  : (
                    <div className={s.imagePlaceholder}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span>Poster do Filme</span>
                    </div>
                  )
                }
              </div>
              <input className={s.input} type="url" name="poster" placeholder="https://..." value={form.poster} onChange={handleChange} />
            </div>

            <div className={s.fieldsCol}>
              <div className={s.field}>
                <label className={s.label}>Título <span className={s.required}>*</span></label>
                <input
                  className={`${s.input} ${errors.titulo ? s.inputError : ''}`}
                  type="text" name="titulo" placeholder="Título do filme"
                  value={form.titulo} onChange={handleChange}
                />
                {errors.titulo && <span className={s.error}>{errors.titulo}</span>}
              </div>

              <div className={s.field}>
                <label className={s.label}>Duração</label>
                <input className={s.input} type="text" name="duracao" placeholder="02:20" value={form.duracao} onChange={handleChange} />
              </div>

              <div className={s.field}>
                <label className={s.label}>Orçamento</label>
                <input className={s.input} type="text" name="orcamento" placeholder="$20000000" value={form.orcamento} onChange={handleChange} />
              </div>

              <div className={s.field}>
                <label className={s.label}>Ano de Lançamento</label>
                <input
                  className={`${s.input} ${errors.ano ? s.inputError : ''}`}
                  type="number" name="ano" placeholder="2026"
                  value={form.ano} onChange={handleChange} min="1888" max="2100"
                />
                {errors.ano && <span className={s.error}>{errors.ano}</span>}
              </div>
            </div>
          </div>

          <div className={s.filtersGrid}>
            <div className={s.field}>
              <label className={s.label}>País de Origem <span className={s.required}>*</span></label>
              <div className={s.selectWrap}>
                <select
                  className={`${s.select} ${errors.id_pais_origem ? s.inputError : ''}`}
                  name="id_pais_origem" value={form.id_pais_origem} onChange={handleChange}
                >
                  <option value="">País de Origem</option>
                  {paises.map(p => <option key={p.id_pais} value={p.id_pais}>{p.nome}</option>)}
                </select>
                <span className={s.selectArrow}>▾</span>
              </div>
              {errors.id_pais_origem && <span className={s.error}>{errors.id_pais_origem}</span>}
            </div>

            <div className={s.field}>
              <label className={s.label}>Produtora Principal</label>
              <div className={s.selectWrap}>
                <select
                  className={s.select}
                  name="id_produtora_principal" value={form.id_produtora_principal} onChange={handleChange}
                >
                  <option value="">Produtora</option>
                  {produtoras.map(p => <option key={p.id_produtora} value={p.id_produtora}>{p.nome}</option>)}
                </select>
                <span className={s.selectArrow}>▾</span>
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label}>Categorias <span className={s.required}>*</span></label>
              <div className={s.selectionHeader}>
                <span>Selecionadas</span>
                <span>{form.ids_categorias.length}</span>
              </div>
              <div className={`${s.selectionBox} ${errors.ids_categorias ? s.inputError : ''}`}>
                {categorias.map(c => (
                  <button
                    key={c.id_categoria} type="button"
                    className={`${s.chip} ${form.ids_categorias.includes(c.id_categoria) ? s.chipOn : ''}`}
                    onClick={() => toggleId('ids_categorias', c.id_categoria)}
                  >
                    {c.nome}
                  </button>
                ))}
              </div>
              {errors.ids_categorias && <span className={s.error}>{errors.ids_categorias}</span>}
            </div>
          </div>

          {/* Idiomas */}
          <div className={`${s.section} ${s.fullWidth}`}>
            <label className={s.label}>Idiomas</label>
            <div className={s.selectionHeader}>
              <span>Selecionados</span>
              <span>{form.ids_linguagens.length}</span>
            </div>
            <div className={s.selectionBox}>
              {linguagens.map(l => (
                <button
                  key={l.id_linguagem} type="button"
                  className={`${s.chip} ${form.ids_linguagens.includes(l.id_linguagem) ? s.chipOn : ''}`}
                  onClick={() => toggleId('ids_linguagens', l.id_linguagem)}
                >
                  {l.nome}
                </button>
              ))}
            </div>
          </div>

          <div className={s.peopleGrid}>
            <div className={s.section}>
              <label className={s.label}>Principais Atores/Atrizes</label>
              <div className={s.selectionHeader}>
                <span>Selecionados</span>
                <span>{form.ids_atores.length}</span>
              </div>
              <div className={s.selectionBox}>
                {[...atores]
                  .sort((a, b) => `${a.nome} ${a.sobrenome ?? ''}`.localeCompare(`${b.nome} ${b.sobrenome ?? ''}`, 'pt-BR'))
                  .map(a => (
                    <button
                      key={a.id_ator} type="button"
                      className={`${s.chip} ${form.ids_atores.includes(a.id_ator) ? s.chipOn : ''}`}
                      onClick={() => toggleId('ids_atores', a.id_ator)}
                    >
                      {`${a.nome} ${a.sobrenome ?? ''}`}
                    </button>
                  ))}
              </div>
            </div>

            <div className={s.section}>
              <label className={s.label}>Diretores</label>
              <div className={s.selectionHeader}>
                <span>Selecionados</span>
                <span>{form.ids_diretores.length}</span>
              </div>
              <div className={s.selectionBox}>
                {[...diretores]
                  .sort((a, b) => `${a.nome} ${a.sobrenome ?? ''}`.localeCompare(`${b.nome} ${b.sobrenome ?? ''}`, 'pt-BR'))
                  .map(d => (
                    <button
                      key={d.id_diretor} type="button"
                      className={`${s.chip} ${form.ids_diretores.includes(d.id_diretor) ? s.chipOn : ''}`}
                      onClick={() => toggleId('ids_diretores', d.id_diretor)}
                    >
                      {`${d.nome} ${d.sobrenome ?? ''}`}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Sinopse */}
          <div className={s.section}>
            <label className={s.label}>Sinopse</label>
            <textarea
              className={s.textarea}
              name="sinopse" placeholder="Escreva a sinopse do filme..."
              value={form.sinopse} onChange={handleChange} rows={4}
            />
          </div>

          {erroModal && <p className={s.erroGeral}>{erroModal}</p>}
        </div>

        <div className={s.modalFooter}>
          <button className={s.btnGhost} onClick={fecharModal}>Cancelar</button>
          <button className={s.btnPrimary} onClick={salvarEdicao} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Admin() {
  const {
    aba, setAba,

    filmesPendentes, loadingFilmes,
    aprovar, negar,

    filmesFiltrados, loadingCadastrados,
    buscaTitulo, setBuscaTitulo,
    deletarFilme,

    usuarios, loadingUsuarios,
    tornarAdmin, rebaixar,

    confirmando, setConfirmando,

    modalAberto, fecharModal,
    filmeEditando, abrirEdicao,
    form, errors, erroModal, salvando,
    handleChange, toggleId, salvarEdicao,

    paises, produtoras, categorias, linguagens, atores, diretores,
  } = useAdmin();

  return (
    <div className={s.page}>
      <Navbar />

      <div className={s.inner}>
        <h1 className={s.titulo}>Painel Admin</h1>

        {/* ── Abas ── */}
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
            className={`${s.aba} ${aba === 'cadastrados' ? s.abaAtiva : ''}`}
            onClick={() => setAba('cadastrados')}
          >
            Filmes Cadastrados
            {filmesFiltrados.length > 0 && (
              <span className={s.badge}>{filmesFiltrados.length}</span>
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
                      {f.poster
                        ? <img src={f.poster} alt={f.titulo} className={s.poster} />
                        : <div className={s.posterPlaceholder}>🎬</div>
                      }
                    </div>

                    <div className={s.filmeInfo}>
                      <h3 className={s.filmeTitulo}>{f.titulo}</h3>
                      {f.titulo_original && <p className={s.filmeSub}>{f.titulo_original}</p>}
                      <div className={s.filmeMeta}>
                        {f.ano        && <span>{f.ano}</span>}
                        {f.duracao    && <span>{f.duracao} min</span>}
                        {f.pais?.nome && <span>{f.pais.nome}</span>}
                      </div>
                      {f.sinopse && <p className={s.sinopse}>{f.sinopse}</p>}
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

        {aba === 'cadastrados' && (
          <section>
            <div className={s.catalogoHeader}>
              <input
                className={s.buscaInput}
                type="text"
                placeholder="Buscar por título..."
                value={buscaTitulo}
                onChange={e => setBuscaTitulo(e.target.value)}
              />
              <span className={s.catalogoCount}>
                {filmesFiltrados.length} filme{filmesFiltrados.length !== 1 ? 's' : ''}
              </span>
            </div>

            {loadingCadastrados ? (
              <p className={s.vazio}>Carregando...</p>
            ) : filmesFiltrados.length === 0 ? (
              <div className={s.vazioBox}>
                <span className={s.vazioIcon}>🎬</span>
                <p>Nenhum filme encontrado.</p>
              </div>
            ) : (
              <div className={s.listaFilmes}>
                {filmesFiltrados.map((f) => (
                  <div key={f.id_filme} className={s.filmeCard}>
                    <div className={s.posterWrap}>
                      {f.poster
                        ? <img src={f.poster} alt={f.titulo} className={s.poster} />
                        : <div className={s.posterPlaceholder}>🎬</div>
                      }
                    </div>

                    <div className={s.filmeInfo}>
                      <h3 className={s.filmeTitulo}>{f.titulo}</h3>
                      <div className={s.filmeMeta}>
                        {f.ano     && <span>{f.ano}</span>}
                        {f.duracao && <span>{f.duracao}</span>}
                        {(f.pais_origem?.nome ?? f.pais?.nome) && (
                          <span>{f.pais_origem?.nome ?? f.pais?.nome}</span>
                        )}
                        {f.categorias?.length > 0 && (
                          <span>{f.categorias.map(c => c.nome).join(', ')}</span>
                        )}
                      </div>
                      {f.sinopse && <p className={s.sinopse}>{f.sinopse}</p>}
                    </div>

                    <div className={s.acoes}>
                      <button
                        className={s.btnEditar}
                        onClick={() => abrirEdicao(f)}
                      >
                        ✎ Editar
                      </button>

                      {confirmando === `deletar-${f.id_filme}` ? (
                        <div className={s.confirmarNegar}>
                          <p>Excluir permanentemente?</p>
                          <div className={s.confirmarBtns}>
                            <button className={s.btnPerigo} onClick={() => deletarFilme(f.id_filme)}>Sim, excluir</button>
                            <button className={s.btnGhost} onClick={() => setConfirmando(null)}>Cancelar</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className={s.btnNegar}
                          onClick={() => setConfirmando(`deletar-${f.id_filme}`)}
                        >
                          🗑 Apagar
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
                            {u.imagem
                              ? <img src={u.imagem} alt={u.nome} className={s.userAvatar} />
                              : (
                                <div className={s.userAvatarFallback}>
                                  {u.nome?.charAt(0).toUpperCase()}
                                </div>
                              )
                            }
                            <div>
                              <p className={s.userName}>{u.nome}</p>
                              {u.apelido && <p className={s.userApelido}>@{u.apelido}</p>}
                            </div>
                          </div>
                        </td>
                        <td className={s.muted}>{u.email}</td>
                        <td className={s.muted}>
                          {u.data_criacao ? new Date(u.data_criacao).toLocaleDateString('pt-BR') : '—'}
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
                            <button className={s.btnGhost} onClick={() => setConfirmando(`rebaixar-${u.id_usuario}`)}>
                              Remover admin
                            </button>
                          ) : (
                            <button className={s.btnPromover} onClick={() => setConfirmando(`admin-${u.id_usuario}`)}>
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

      {modalAberto && filmeEditando && (
        <ModalEdicao
          filme={filmeEditando}
          form={form}
          errors={errors}
          erroModal={erroModal}
          salvando={salvando}
          paises={paises}
          produtoras={produtoras}
          categorias={categorias}
          linguagens={linguagens}
          atores={atores}
          diretores={diretores}
          handleChange={handleChange}
          toggleId={toggleId}
          salvarEdicao={salvarEdicao}
          fecharModal={fecharModal}
        />
      )}
    </div>
  );
}