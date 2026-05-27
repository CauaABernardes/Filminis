import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dadosService, filmesService } from '../../services/api';

export function useTodosFilmes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filmes,     setFilmes]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [paises,     setPaises]     = useState([]);

  const filtros = {
    titulo:    searchParams.get('titulo')    || '',
    categoria: searchParams.get('categoria') || '',
    ano:       searchParams.get('ano')       || '',
    pais:      searchParams.get('pais')      || '',
  };

  useEffect(() => {
    dadosService.categorias().then(({ data }) => setCategorias(data)).catch(() => {});
    dadosService.paises().then(({ data }) => setPaises(data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { limit: 100, aprovados: true };
    if (filtros.titulo)    params.titulo    = filtros.titulo;
    if (filtros.categoria) params.categoria = filtros.categoria;
    if (filtros.ano)       params.ano       = filtros.ano;
    if (filtros.pais)      params.pais      = filtros.pais;

    filmesService.listar(params)
      .then(({ data }) => setFilmes(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [searchParams.toString()]);

  const setFiltro = (campo, valor) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (valor) next.set(campo, valor);
      else next.delete(campo);
      return next;
    });
  };

  const limpar = () => setSearchParams({});

  const anos = Array.from({ length: 35 }, (_, i) => 2028 - i);
  const temFiltro = Object.values(filtros).some(Boolean);

  return { filmes, loading, filtros, setFiltro, limpar, categorias, paises, anos, temFiltro };
}
