import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dadosService, filmesService } from '../../services/api';

const FORM_INICIAL = {
  titulo: '',
  trailer: '',
  banner: '',
  poster: '',
  duracao: '',
  orcamento: '',
  ano: '',
  sinopse: '',
  id_pais_origem: '',
  id_produtora_principal: '',
  ids_categorias: [],
  ids_linguagens: [],
  ids_atores: [],
  ids_diretores: [],
  ids_produtoras: [],
  ids_paises: [],
};

export function useSugestao() {
  const navigate = useNavigate();

  const [form, setForm] = useState(FORM_INICIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  // Dados auxiliares
  const [paises, setPaises]       = useState([]);
  const [produtoras, setProdutoras] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [linguagens, setLinguagens] = useState([]);
  const [atores, setAtores]         = useState([]);
  const [diretores, setDiretores]   = useState([]);

  useEffect(() => {
    Promise.all([
      dadosService.paises(),
      dadosService.produtoras(),
      dadosService.categorias(),
      dadosService.linguagens(),
      dadosService.atores(),
      dadosService.diretores(),
    ]).then(([p, pr, c, l, a, d]) => {
      setPaises(p.data);
      setProdutoras(pr.data);
      setCategorias(c.data);
      setLinguagens(l.data);
      setAtores(a.data);
      setDiretores(d.data);
    }).catch(() => setErroGeral('Erro ao carregar dados auxiliares.'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: '' }));
  };

  const toggleId = (field, id) => {
    setForm(f => {
      const atual = f[field];
      return {
        ...f,
        [field]: atual.includes(id)
          ? atual.filter(x => x !== id)
          : [...atual, id],
      };
    });
  };

  const validar = () => {
    const e = {};
    if (!form.titulo.trim())        e.titulo       = 'Título obrigatório.';
    if (!form.id_pais_origem)       e.id_pais_origem = 'País de origem obrigatório.';
    if (form.ids_categorias.length === 0) e.ids_categorias = 'Selecione ao menos uma categoria.';
    if (form.ano && (isNaN(form.ano) || form.ano < 1888 || form.ano > 2100))
      e.ano = 'Ano inválido.';
    return e;
  };

  const handleSubmit = async () => {
    const e = validar();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setErroGeral('');
    try {
      const payload = {
        ...form,
        ano:      form.ano      ? parseInt(form.ano)           : undefined,
        orcamento: form.orcamento ? parseFloat(form.orcamento.replace(/[^0-9.]/g, '')) : undefined,
        id_pais_origem:          parseInt(form.id_pais_origem),
        id_produtora_principal:  form.id_produtora_principal ? parseInt(form.id_produtora_principal) : undefined,
      };
      Object.keys(payload).forEach(k => {
        if (payload[k] === '' || payload[k] === undefined) delete payload[k];
      });

      await filmesService.criar(payload);
      setSucesso(true);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setErroGeral(typeof detail === 'string' ? detail : 'Erro ao enviar sugestão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    form, errors, loading, sucesso, erroGeral,
    paises, produtoras, categorias, linguagens, atores, diretores,
    handleChange, toggleId, handleSubmit,
    irParaHome: () => navigate('/'),
  };
}