import { useCallback, useEffect, useState } from 'react';
import { dadosService, filmesService, usuariosService } from '../../services/api';

const FORM_VAZIO = {
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

export function useAdmin() {
  const [aba, setAba] = useState('filmes');

  const [filmesPendentes, setFilmesPendentes] = useState([]);
  const [loadingFilmes, setLoadingFilmes]     = useState(true);

  const [filmesCadastrados, setFilmesCadastrados] = useState([]);
  const [loadingCadastrados, setLoadingCadastrados] = useState(true);
  const [buscaTitulo, setBuscaTitulo] = useState('');

  const [usuarios, setUsuarios]               = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  const [modalAberto, setModalAberto]   = useState(false);
  const [filmeEditando, setFilmeEditando] = useState(null);
  const [form, setForm]                 = useState(FORM_VAZIO);
  const [errors, setErrors]             = useState({});
  const [erroModal, setErroModal]       = useState('');
  const [salvando, setSalvando]         = useState(false);

  const [paises, setPaises]         = useState([]);
  const [produtoras, setProdutoras] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [linguagens, setLinguagens] = useState([]);
  const [atores, setAtores]         = useState([]);
  const [diretores, setDiretores]   = useState([]);

  const [confirmando, setConfirmando] = useState(null);

  const buscarPendentes = useCallback(async () => {
    setLoadingFilmes(true);
    try {
      const { data } = await filmesService.pendentes();
      setFilmesPendentes(Array.isArray(data) ? data : data.items ?? []);
    } catch (err) {
      console.error('Erro ao buscar filmes pendentes:', err);
    } finally {
      setLoadingFilmes(false);
    }
  }, []);

  const buscarCadastrados = useCallback(async () => {
    setLoadingCadastrados(true);
    try {
      const { data } = await filmesService.listar({ aprovados: true, limit: 100 });
      setFilmesCadastrados(Array.isArray(data) ? data : data.items ?? []);
    } catch (err) {
      console.error('Erro ao buscar filmes cadastrados:', err);
    } finally {
      setLoadingCadastrados(false);
    }
  }, []);

  const buscarUsuarios = useCallback(async () => {
    setLoadingUsuarios(true);
    try {
      const { data } = await usuariosService.listar();
      setUsuarios(Array.isArray(data) ? data : data.items ?? []);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    } finally {
      setLoadingUsuarios(false);
    }
  }, []);

  useEffect(() => { buscarPendentes();   }, [buscarPendentes]);
  useEffect(() => { buscarCadastrados(); }, [buscarCadastrados]);
  useEffect(() => { buscarUsuarios();    }, [buscarUsuarios]);

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
    }).catch(err => console.error('Erro ao carregar dados auxiliares:', err));
  }, []);

  const aprovar = async (id_filme) => {
    setConfirmando(`aprovar-${id_filme}`);
    try {
      await filmesService.aprovar(id_filme);
      setFilmesPendentes(prev => prev.filter(f => f.id_filme !== id_filme));
      buscarCadastrados();
    } catch (err) {
      console.error('Erro ao aprovar filme:', err);
    } finally {
      setConfirmando(null);
    }
  };

  const negar = async (id_filme) => {
    try {
      await filmesService.deletar(id_filme);
      setFilmesPendentes(prev => prev.filter(f => f.id_filme !== id_filme));
    } catch (err) {
      console.error('Erro ao negar filme:', err);
    } finally {
      setConfirmando(null);
    }
  };

  const deletarFilme = async (id_filme) => {
    try {
      await filmesService.deletar(id_filme);
      setFilmesCadastrados(prev => prev.filter(f => f.id_filme !== id_filme));
    } catch (err) {
      console.error('Erro ao deletar filme:', err);
    } finally {
      setConfirmando(null);
    }
  };

  const abrirEdicao = (filme) => {
    setFilmeEditando(filme);
    setForm({
      titulo:                filme.titulo ?? '',
      trailer:               filme.trailer ?? '',
      banner:                filme.banner ?? '',
      poster:                filme.poster ?? '',
      duracao:               filme.duracao ?? '',
      orcamento:             filme.orcamento != null ? String(filme.orcamento) : '',
      ano:                   filme.ano != null ? String(filme.ano) : '',
      sinopse:               filme.sinopse ?? '',
      id_pais_origem:        filme.pais_origem?.id_pais ?? filme.id_pais_origem ?? '',
      id_produtora_principal: filme.produtora_principal?.id_produtora ?? filme.id_produtora_principal ?? '',
      ids_categorias:        (filme.categorias ?? []).map(c => c.id_categoria),
      ids_linguagens:        (filme.linguagens  ?? []).map(l => l.id_linguagem),
      ids_atores:            (filme.atores      ?? []).map(a => a.id_ator),
      ids_diretores:         (filme.diretores   ?? []).map(d => d.id_diretor),
      ids_produtoras:        (filme.produtoras  ?? []).map(p => p.id_produtora),
      ids_paises:            (filme.paises      ?? []).map(p => p.id_pais),
    });
    setErrors({});
    setErroModal('');
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFilmeEditando(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: '' }));
  };

  const toggleId = (field, id) => {
    setForm(f => {
      const atual = f[field];
      return {
        ...f,
        [field]: atual.includes(id) ? atual.filter(x => x !== id) : [...atual, id],
      };
    });
  };

  const validarForm = () => {
    const e = {};
    if (!form.titulo.trim())              e.titulo         = 'Título obrigatório.';
    if (!form.id_pais_origem)             e.id_pais_origem = 'País de origem obrigatório.';
    if (form.ids_categorias.length === 0) e.ids_categorias = 'Selecione ao menos uma categoria.';
    if (form.ano && (isNaN(form.ano) || form.ano < 1888 || form.ano > 2100))
      e.ano = 'Ano inválido.';
    return e;
  };

  const salvarEdicao = async () => {
    const e = validarForm();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSalvando(true);
    setErroModal('');
    try {
      const payload = {
        ...form,
        ano:                    form.ano       ? parseInt(form.ano)                                    : undefined,
        orcamento:              form.orcamento ? parseFloat(form.orcamento.replace(/[^0-9.]/g, ''))    : undefined,
        id_pais_origem:         form.id_pais_origem          ? parseInt(form.id_pais_origem)           : undefined,
        id_produtora_principal: form.id_produtora_principal  ? parseInt(form.id_produtora_principal)   : undefined,
      };
      Object.keys(payload).forEach(k => {
        if (payload[k] === '' || payload[k] === undefined) delete payload[k];
      });

      const { data } = await filmesService.editar(filmeEditando.id_filme, payload);
      setFilmesCadastrados(prev =>
        prev.map(f => (f.id_filme === filmeEditando.id_filme ? data : f))
      );
      fecharModal();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setErroModal(typeof detail === 'string' ? detail : 'Erro ao salvar. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  const tornarAdmin = async (id_usuario) => {
    try {
      await usuariosService.alterarRole(id_usuario, 'admin');
      setUsuarios(prev => prev.map(u => (u.id_usuario === id_usuario ? { ...u, role: 'admin' } : u)));
    } catch (err) {
      console.error('Erro ao tornar admin:', err);
    } finally {
      setConfirmando(null);
    }
  };

  const rebaixar = async (id_usuario) => {
    try {
      await usuariosService.alterarRole(id_usuario, 'user');
      setUsuarios(prev => prev.map(u => (u.id_usuario === id_usuario ? { ...u, role: 'user' } : u)));
    } catch (err) {
      console.error('Erro ao rebaixar usuário:', err);
    } finally {
      setConfirmando(null);
    }
  };

  const filmesFiltrados = filmesCadastrados.filter(f =>
    f.titulo?.toLowerCase().includes(buscaTitulo.toLowerCase())
  );

  return {
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
  };
}