import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import s from './Sugestao.module.css';
import { useSugestao } from './Sugestao.logic';

export default function Sugestao() {
  const {
    form, errors, loading, sucesso, erroGeral,
    paises, produtoras, categorias, linguagens, atores, diretores,
    handleChange, toggleId, handleSubmit, irParaHome,
  } = useSugestao();

  if (sucesso) {
    return (
      <div className={s.page}>
        <Navbar />
        <div className={s.sucesso}>
          <span className={s.sucessoIcon}>🎬</span>
          <h2>Sugestão enviada!</h2>
          <p>Seu filme foi enviado para análise e em breve estará disponível no catálogo.</p>
          <button className={s.btnPrimary} onClick={irParaHome}>Voltar para a Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={s.page}>
      <Navbar />

      <div className={s.inner}>
        <h1 className={s.pageTitle}>Sugestão de Filme</h1>
        <p className={s.pageSubtitle}>Preencha os dados do filme que você quer ver no catálogo.</p>

        <div className={s.section}>
          <label className={s.label}>Banner do Filme</label>
          <div className={`${s.imagePreviewBox} ${form.banner ? s.hasImage : ''}`}>
            {form.banner
              ? <img src={form.banner} alt="Banner" className={s.bannerPreview} onError={e => e.target.style.display='none'} />
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
          <input
            className={s.input}
            type="url"
            name="banner"
            placeholder="https://..."
            value={form.banner}
            onChange={handleChange}
          />
        </div>

        <div className={s.section}>
          <label className={s.label}>Link Trailer</label>
          <input
            className={s.input}
            type="url"
            name="trailer"
            placeholder="https://youtu.be/"
            value={form.trailer}
            onChange={handleChange}
          />
        </div>

        <div className={s.posterGrid}>
          <div className={s.posterCol}>
            <label className={s.label}>Poster do Filme</label>
            <div className={`${s.posterBox} ${form.poster ? s.hasImage : ''}`}>
              {form.poster
                ? <img src={form.poster} alt="Poster" className={s.posterPreview} onError={e => e.target.style.display='none'} />
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
            <input
              className={s.input}
              type="url"
              name="poster"
              placeholder="https://..."
              value={form.poster}
              onChange={handleChange}
            />
          </div>

          <div className={s.fieldsCol}>
            <div className={s.field}>
              <label className={s.label}>Título do filme <span className={s.required}>*</span></label>
              <input
                className={`${s.input} ${errors.titulo ? s.inputError : ''}`}
                type="text"
                name="titulo"
                placeholder="The Filme: Exemplo..."
                value={form.titulo}
                onChange={handleChange}
              />
              {errors.titulo && <span className={s.error}>{errors.titulo}</span>}
            </div>

            <div className={s.field}>
              <label className={s.label}>Duração do filme</label>
              <input
                className={s.input}
                type="text"
                name="duracao"
                placeholder="4h 20m... (ex: 02:20)"
                value={form.duracao}
                onChange={handleChange}
              />
            </div>

            <div className={s.field}>
              <label className={s.label}>Orçamento do Filme</label>
              <input
                className={s.input}
                type="text"
                name="orcamento"
                placeholder="$20M"
                value={form.orcamento}
                onChange={handleChange}
              />
            </div>

            <div className={s.field}>
              <label className={s.label}>Ano de Lançamento do Filme</label>
              <input
                className={`${s.input} ${errors.ano ? s.inputError : ''}`}
                type="number"
                name="ano"
                placeholder="2026"
                value={form.ano}
                onChange={handleChange}
                min="1888"
                max="2100"
              />
              {errors.ano && <span className={s.error}>{errors.ano}</span>}
            </div>
          </div>
        </div>

        <div className={s.filtersGrid}>
            <div className={s.field}>
                <label className={s.label}>
                    País de Origem <span className={s.required}>*</span>
                </label>

                <div className={s.selectWrap}>
                    <select
                        className={`${s.select} ${
                        errors.id_pais_origem ? s.inputError : ''
                        }`}
                        name="id_pais_origem"
                        value={form.id_pais_origem}
                        onChange={handleChange}
                    >
                        <option value="">País de Origem</option>

                        {paises.map(p => (
                        <option key={p.id_pais} value={p.id_pais}>
                            {p.nome}
                        </option>
                        ))}
                    </select>

                    <span className={s.selectArrow}>▾</span>
                </div>

                {errors.id_pais_origem && (
                    <span className={s.error}>
                        {errors.id_pais_origem}
                    </span>
                )}
            </div>

            <div className={s.field}>
                <label className={s.label}>
                    Produtora Principal
                </label>

                <div className={s.selectWrap}>
                    <select
                        className={s.select}
                        name="id_produtora_principal"
                        value={form.id_produtora_principal}
                        onChange={handleChange}>

                        <option value="">Produtora</option>

                        {produtoras.map(p => (
                            <option
                                key={p.id_produtora}
                                value={p.id_produtora}
                            >
                                {p.nome}
                            </option>
                        ))}
                    </select>

                    <span className={s.selectArrow}>▾</span>
                </div>
            </div>

            <div className={s.field}>
                <label className={s.label}>
                    Categorias <span className={s.required}>*</span>
                </label>

                <div className={s.selectionHeader}>
                    <span>Selecionadas</span>
                    <span>{form.ids_categorias.length}</span>
                </div>

                <div className={`${s.selectionBox} ${
                    errors.ids_categorias ? s.inputError : ''
                }`}>
                    {categorias.map(c => (
                        <button
                            key={c.id_categoria}
                            type="button"
                            className={`${s.chip} ${
                                form.ids_categorias.includes(c.id_categoria)
                                ? s.chipOn
                                : ''
                            }`}
                            onClick={() =>
                                toggleId('ids_categorias', c.id_categoria)
                            }>
                            {c.nome}
                        </button>
                    ))}
                </div>

                {errors.ids_categorias && (
                    <span className={s.error}>
                        {errors.ids_categorias}
                    </span>
                )}
            </div>
        </div>

        <div className={`${s.section} ${s.fullWidth}`}>
            <label className={s.label}>
                Idiomas
            </label>

            <div className={s.selectionHeader}>
                <span>Selecionados</span>
                <span>{form.ids_linguagens.length}</span>
            </div>

            <div className={s.selectionBox}>
                {linguagens.map(l => (
                    <button
                        key={l.id_linguagem}
                        type="button"
                        className={`${s.chip} ${
                            form.ids_linguagens.includes(l.id_linguagem)
                                ? s.chipOn
                                : ''
                        }`}
                        onClick={() =>
                            toggleId('ids_linguagens', l.id_linguagem)
                        }
                    >
                        {l.nome}
                    </button>
                ))}
            </div>
        </div>

        <div className={s.peopleGrid}>
            <div className={s.section}>
                <label className={s.label}>
                    Principais Atores/Atrizes
                </label>

                <div className={s.selectionHeader}>
                    <span>Selecionados</span>
                    <span>{form.ids_atores.length}</span>
                </div>

                <div className={s.selectionBox}>
                    {[...atores]
                        .sort((a, b) =>
                            `${a.nome} ${a.sobrenome ?? ''}`.localeCompare(
                            `${b.nome} ${b.sobrenome ?? ''}`,
                            'pt-BR'
                            )
                        )
                        .map(a => (
                            <button
                                key={a.id_ator}
                                type="button"
                                className={`${s.chip} ${
                                    form.ids_atores.includes(a.id_ator)
                                    ? s.chipOn
                                    : ''
                                }`}
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
                        .sort((a, b) =>
                            `${a.nome} ${a.sobrenome ?? ''}`.localeCompare(
                            `${b.nome} ${b.sobrenome ?? ''}`,
                            'pt-BR'
                            )
                        )
                        .map(d => (
                            <button
                                key={d.id_diretor}
                                type="button"
                                className={`${s.chip} ${
                                    form.ids_diretores.includes(d.id_diretor)
                                    ? s.chipOn
                                    : ''
                                }`}
                                onClick={() => toggleId('ids_diretores', d.id_diretor)}
                                >
                                {`${d.nome} ${d.sobrenome ?? ''}`}
                            </button>
                    ))}
                </div>
            </div>
        </div>

        <div className={s.section}>
          <label className={s.label}>Sinopse do Filme</label>
          <textarea
            className={s.textarea}
            name="sinopse"
            placeholder="Escreva a sinopse do filme..."
            value={form.sinopse}
            onChange={handleChange}
            rows={5}
          />
        </div>

        {erroGeral && <p className={s.erroGeral}>{erroGeral}</p>}

        <div className={s.submitRow}>
          <button
            className={s.btnPrimary}
            type="button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Sugestão'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}