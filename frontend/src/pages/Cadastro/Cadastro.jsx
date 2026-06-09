import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCadastro } from './Cadastro.logic';
import s from './Cadastro.module.css';

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function Cadastro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const {
    form, errors, loading,
    showSenha, setShowSenha,
    showConfirma, setShowConfirma,
    handleChange, handleSubmit,
  } = useCadastro(register, navigate);

  return (
    <div className={s.page}>
      <img src="/cadastro.png" alt="" className={s.bgImg} />

      {/* Tagline no canto superior esquerdo */}
      <h1 className={s.tagline}>
        Faça parte da mais<br />
        pura experiência<br />
        Absoluta do Cinema
      </h1>

      <div className={s.card}>
        <h2 className={s.titulo}>Cadastre-se:</h2>

        <form onSubmit={handleSubmit} noValidate>

          <div className={s.row}>
            <div className={s.field}>
              <label className={s.label}>Nome <span className={s.req}>*</span></label>
              <input
                className={`${s.input} ${errors.nome ? s.inputError : ''}`}
                type="text" name="nome"
                placeholder="Seu nome ..."
                value={form.nome} onChange={handleChange}
              />
              {errors.nome && <span className={s.error}>{errors.nome}</span>}
            </div>
            <div className={s.field}>
              <label className={s.label}>Usuário <span className={s.req}>*</span></label>
              <input
                className={`${s.input} ${errors.apelido ? s.inputError : ''}`}
                type="text" name="apelido"
                placeholder="@apelido ..."
                value={form.apelido} onChange={handleChange}
              />
              {errors.apelido && <span className={s.error}>{errors.apelido}</span>}
            </div>
          </div>

          <div className={s.field}>
            <label className={s.label}>Email <span className={s.req}>*</span></label>
            <input
              className={`${s.input} ${errors.email ? s.inputError : ''}`}
              type="email" name="email"
              placeholder="Digite seu email aqui ..."
              value={form.email} onChange={handleChange}
            />
            {errors.email && <span className={s.error}>{errors.email}</span>}
          </div>

          <div className={s.row}>
            <div className={s.field}>
              <label className={s.label}>Senha <span className={s.req}>*</span></label>
              <div className={s.inputWrap}>
                <input
                  className={`${s.input} ${errors.senha ? s.inputError : ''}`}
                  type={showSenha ? 'text' : 'password'} name="senha"
                  placeholder="Mínimo 6 caracteres ..."
                  value={form.senha} onChange={handleChange}
                />
                <button type="button" className={s.eyeBtn} onClick={() => setShowSenha(v => !v)}>
                  <EyeIcon open={showSenha} />
                </button>
              </div>
              {errors.senha && <span className={s.error}>{errors.senha}</span>}
            </div>
            <div className={s.field}>
              <label className={s.label}>Confirme <span className={s.req}>*</span></label>
              <div className={s.inputWrap}>
                <input
                  className={`${s.input} ${errors.confirma ? s.inputError : ''}`}
                  type={showConfirma ? 'text' : 'password'} name="confirma"
                  placeholder="Repita a senha ..."
                  value={form.confirma} onChange={handleChange}
                />
                <button type="button" className={s.eyeBtn} onClick={() => setShowConfirma(v => !v)}>
                  <EyeIcon open={showConfirma} />
                </button>
              </div>
              {errors.confirma && <span className={s.error}>{errors.confirma}</span>}
            </div>
          </div>

          <div className={s.row}>
            <div className={s.field}>
              <label className={s.label}>Nascimento <span className={s.opt}>(opcional)</span></label>
              <input
                className={s.input}
                type="date" name="data_nascimento"
                value={form.data_nascimento} onChange={handleChange}
              />
            </div>
            <div className={s.field}>
              <label className={s.label}>Link da Foto <span className={s.opt}>(opcional)</span></label>
              <input
                className={`${s.input} ${errors.imagem ? s.inputError : ''}`}
                type="url" name="imagem"
                placeholder="https://..."
                value={form.imagem} onChange={handleChange}
              />
              {errors.imagem && <span className={s.error}>{errors.imagem}</span>}
            </div>
          </div>

          {errors.geral && <p className={s.erroGeral}>{errors.geral}</p>}

          <button className={s.btnCadastrar} type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className={s.rodape}>
          Já tem Login?{' '}
          <Link to="/login" className={s.link}>Acesse sua conta Absolute!</Link>
        </p>
      </div>
    </div>
  );
}