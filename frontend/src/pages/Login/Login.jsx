import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLogin } from './Login.logic';
import s from './Login.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { form, errors, loading, showSenha, setShowSenha, handleChange, handleSubmit } = useLogin(login, navigate);

  return (
    <div className={s.page}>
    
      <h1 className={s.tagline}>
        Viva a mais pura<br />
        experiência Absoluta<br />
        do Cinema
      </h1>

      <img src="/login.png" alt="" className={s.bgImg} />

      <div className={s.card}>
        <h2 className={s.titulo}>Login:</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className={s.field}>
            <label className={s.label}>Email</label>
            <input
              className={`${s.input} ${errors.email ? s.inputError : ''}`}
              type="email"
              name="email"
              placeholder="Digite seu email aqui ..."
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className={s.error}>{errors.email}</span>}
          </div>

          <div className={s.field}>
            <label className={s.label}>Senha</label>
            <div className={s.inputWrap}>
              <input
                className={`${s.input} ${errors.senha ? s.inputError : ''}`}
                type={showSenha ? 'text' : 'password'}
                name="senha"
                placeholder="Digite sua senha aqui ..."
                value={form.senha}
                onChange={handleChange}
              />
              <button
                type="button"
                className={s.eyeBtn}
                onClick={() => setShowSenha(v => !v)}
                aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showSenha ? (
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
                )}
              </button>
            </div>
            {errors.senha && <span className={s.error}>{errors.senha}</span>}
          </div>

          {errors.geral && <p className={s.erroGeral}>{errors.geral}</p>}

          <button className={s.btnAcessar} type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Acessar'}
          </button>
        </form>

        <p className={s.rodape}>
          Não tem Login?{' '}
          <Link to="/cadastro" className={s.link}>Seja um Absolute conosco!</Link>
        </p>
      </div>
    </div>
  );
}
