import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Home        from './pages/Home/Home';
import Catalogo    from './pages/Catalogo/Catalogo';
import TodosFilmes from './pages/TodosFilmes/TodosFilmes';
import Filme       from './pages/Filme/Filme';
import Login       from './pages/Login/Login';
import Cadastro    from './pages/Cadastro/Cadastro';
import Sugestao    from './pages/Sugestao/Sugestao.jsx';

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/catalogo"   element={<Catalogo />} />
          <Route path="/filmes"     element={<TodosFilmes />} />
          <Route path="/filmes/:id" element={<Filme />} />

          <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/cadastro" element={<GuestRoute><Cadastro /></GuestRoute>} />

          <Route
            path="/sugestao"
            element={
              <ProtectedRoute>
                <Sugestao />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}