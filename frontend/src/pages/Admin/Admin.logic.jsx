import { useCallback, useEffect, useState } from 'react';
import { filmesService, usuariosService } from '../../services/api';

export function useAdmin() {
  const [aba, setAba] = useState('filmes');

  const [filmesPendentes, setFilmesPendentes] = useState([]);
  const [loadingFilmes, setLoadingFilmes]     = useState(true);

  const [usuarios, setUsuarios]           = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

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

  useEffect(() => { buscarPendentes(); }, [buscarPendentes]);
  useEffect(() => { buscarUsuarios();  }, [buscarUsuarios]);

  const aprovar = async (id_filme) => {
    setConfirmando(`aprovar-${id_filme}`);
    try {
      await filmesService.aprovar(id_filme);
      setFilmesPendentes((prev) => prev.filter((f) => f.id_filme !== id_filme));
    } catch (err) {
      console.error('Erro ao aprovar filme:', err);
    } finally {
      setConfirmando(null);
    }
  };

  const negar = async (id_filme) => {
    try {
      await filmesService.deletar(id_filme);
      setFilmesPendentes((prev) => prev.filter((f) => f.id_filme !== id_filme));
    } catch (err) {
      console.error('Erro ao negar filme:', err);
    } finally {
      setConfirmando(null);
    }
  };

  const tornarAdmin = async (id_usuario) => {
    try {
      await usuariosService.alterarRole(id_usuario, 'admin');
      setUsuarios((prev) =>
        prev.map((u) => (u.id_usuario === id_usuario ? { ...u, role: 'admin' } : u))
      );
    } catch (err) {
      console.error('Erro ao tornar admin:', err);
    } finally {
      setConfirmando(null);
    }
  };

  const rebaixar = async (id_usuario) => {
    try {
      await usuariosService.alterarRole(id_usuario, 'user');
      setUsuarios((prev) =>
        prev.map((u) => (u.id_usuario === id_usuario ? { ...u, role: 'user' } : u))
      );
    } catch (err) {
      console.error('Erro ao rebaixar usuário:', err);
    } finally {
      setConfirmando(null);
    }
  };

  return {
    aba, setAba,
    filmesPendentes, loadingFilmes,
    usuarios, loadingUsuarios,
    aprovar, negar,
    tornarAdmin, rebaixar,
    confirmando, setConfirmando,
  };
}