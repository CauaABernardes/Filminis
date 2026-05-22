import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { filmesService } from '../../services/api';
import { formatarDuracao, formatarOrcamento, getBandeira } from '../../utils/helpers';

export function useFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLogado } = useAuth();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setLoading(true);
    filmesService.buscar(id)
      .then(({ data }) => setFilme(data))
      .catch(() => setErro('Filme não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSugestao = () => {
    if (isLogado) {
      navigate(`/sugestao/${id}`);
    } else {
      navigate('/login');
    }
  };

  const paises = filme?.paises ?? [];
  const paisOrigem = filme?.pais_origem ?? paises[0] ?? null;

  // Bandeiras: mostra país de origem + demais (até 3) + "+X"
  const bandeiras = () => {
    if (!paises.length) return { principais: [], extra: 0 };
    const LIMITE = 3;
    const principais = paises.slice(0, LIMITE);
    const extra = paises.length > LIMITE ? paises.length - LIMITE : 0;
    return { principais, extra };
  };

  const duracao  = formatarDuracao(filme?.duracao);
  const orcamento = formatarOrcamento(filme?.orcamento);
  const bandeira  = getBandeira(paisOrigem?.nome);
  const { principais: bandeirasArr, extra: bandeirasExtra } = bandeiras();

  // Extrai ID do YouTube do link do trailer
  const youtubeId = (() => {
    if (!filme?.trailer) return null;
    const m = filme.trailer.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  })();

  return { filme, loading, erro, handleSugestao, duracao, orcamento, bandeira, bandeirasArr, bandeirasExtra, youtubeId, isLogado };
}
