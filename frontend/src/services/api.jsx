import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8000' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const { data } = await axios.post('http://localhost:8000/auth/refresh', { refresh_token: refresh });
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          err.config.headers.Authorization = `Bearer ${data.access_token}`;
          return axios(err.config);
        } catch {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

export const filmesService = {
  listar:    (params) => api.get('/filmes', { params }),
  buscar:    (id_filme)     => api.get(`/filmes/${id_filme}`),
  criar:     (data)   => api.post('/filmes', data),
  editar:    (id_filme, d)  => api.patch(`/filmes/${id_filme}`, d),
  aprovar:   (id_filme)     => api.put(`/filmes/${id_filme}/aprovar`),
  deletar:   (id_filme)     => api.delete(`/filmes/${id_filme}`),
  pendentes: ()       => api.get('/filmes/pendentes'),
};

export const dadosService = {
  categorias: () => api.get('/dados/categorias'),
  paises:     () => api.get('/dados/paises'),
  produtoras: () => api.get('/dados/produtoras'),
  linguagens: () => api.get('/dados/linguagens'),
  atores:     () => api.get('/dados/atores'),
  diretores:  () => api.get('/dados/diretores'),
};

export const authService = {
  login:    (email, senha) => api.post('/auth/login', { email, senha }),
  register: (data)         => api.post('/auth/register', data),
  logout:   ()             => api.post('/auth/logout', { refresh_token: localStorage.getItem('refresh_token') }),
};

export const usuariosService = {
  me:          ()          => api.get('/usuarios/me'),
  atualizar:   (data)      => api.patch('/usuarios/me', data),
  listar:      ()          => api.get('/usuarios'),
  alterarRole: (id, role)  => api.patch(`/usuarios/${id}/role`, { role }),
};

export const homeService = {
  destaques:       ()           => api.get('/home/destaques'),
  salvarDestaques: (ids_filmes) => api.put('/home/destaques', { ids_filmes }),
  limparDestaques: ()           => api.delete('/home/destaques'),
};

export default api;