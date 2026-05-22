import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home        from './pages/Home/Home';
import Catalogo    from './pages/Catalogo/Catalogo';
import TodosFilmes from './pages/TodosFilmes/TodosFilmes';
import Filme       from './pages/Filme/Filme';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/catalogo"  element={<Catalogo />} />
          <Route path="/filmes"    element={<TodosFilmes />} />
          <Route path="/filmes/:id" element={<Filme />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
