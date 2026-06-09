import { useState } from 'react';

export function useCadastro(register, navigate) {
  const [form, setForm] = useState({
    nome: '',
    apelido: '',
    email: '',
    senha: '',
    confirma: '',
    data_nascimento: '',
    imagem: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '', geral: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório.';
    if (!form.apelido.trim()) errs.apelido = 'Nome de usuário é obrigatório.';
    if (!form.email.trim()) errs.email = 'Email é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido.';
    if (!form.senha) errs.senha = 'Senha é obrigatória.';
    else if (form.senha.length < 6) errs.senha = 'Mínimo 6 caracteres.';
    if (!form.confirma) errs.confirma = 'Confirme a senha.';
    else if (form.confirma !== form.senha) errs.confirma = 'As senhas não coincidem.';
    if (form.imagem && !/^https?:\/\/.+/.test(form.imagem.trim()))
      errs.imagem = 'Insira uma URL válida (http/https).';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const payload = {
        nome: form.nome.trim(),
        apelido: form.apelido.trim(),
        email: form.email.trim(),
        senha: form.senha,
        // Campos opcionais — só envia se preenchidos
        ...(form.data_nascimento && { data_nascimento: form.data_nascimento }),
        ...(form.imagem.trim()   && { imagem: form.imagem.trim() }),
      };
      await register(payload);
      navigate('/');
    } catch (err) {
      const detail = err?.response?.data?.detail;
      let msg = 'Erro ao cadastrar. Tente novamente.';
      if (typeof detail === 'string') msg = detail;
      else if (Array.isArray(detail)) msg = detail[0]?.msg || msg;
      setErrors({ geral: msg });
    } finally {
      setLoading(false);
    }
  };

  return {
    form, errors, loading,
    showSenha, setShowSenha,
    showConfirma, setShowConfirma,
    handleChange, handleSubmit,
  };
}
