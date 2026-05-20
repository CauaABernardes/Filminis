import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function useNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [busca, setBusca]           = useState('');
  const [menuAberto, setMenuAberto] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleBusca = (e) => {
    if (e.key === 'Enter' && busca.trim()) {
      navigate(`/filmes?titulo=${encodeURIComponent(busca.trim())}`);
      setBusca('');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMenuAberto(false);
  };

  return { user, isAdmin, busca, setBusca, handleBusca, menuAberto, setMenuAberto, isActive, handleLogout };
}