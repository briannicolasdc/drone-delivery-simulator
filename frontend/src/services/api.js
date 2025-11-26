import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export default {
  createOrder: (data) => api.post('/pedidos', data).then((r) => r.data),
  getOrders: () => api.get('/pedidos').then((r) => r.data),
  markAsDelivered: (id) =>
    api.post(`/pedidos/${id}/entregar`).then((r) => r.data),
  getDronesStatus: () => api.get('/drones/status').then((r) => r.data),
  getSimulationRoute: () => api.get('/simulacoes/rota').then((r) => r.data)
};
