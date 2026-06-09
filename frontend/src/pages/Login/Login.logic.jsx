import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useLogin(login, navigate) {
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/';

  const [form, setForm] = useState({ email: '', senha: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '', geral: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido.';
    if (!form.senha) errs.senha = 'Senha é obrigatória.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await login(form.email, form.senha);
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        'Email ou senha incorretos.';
      setErrors({ geral: msg });
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, loading, showSenha, setShowSenha, handleChange, handleSubmit };
}
