import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const listarUsuarios = async () => {
  const response = await api.get('/usuarios');
  return response.data;
};

export const buscarUsuario = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const criarUsuario = async (dados) => {
  const response = await api.post('/usuarios', dados);
  return response.data;
};

export const atualizarUsuario = async (id, dados) => {
  const response = await api.put(
    `/usuarios/${id}`,
    dados
  );
  return response.data;
};

export const excluirUsuario = async (id) => {
  const response = await api.delete(
    `/usuarios/${id}`
  );
  return response.data;
};

export default api;