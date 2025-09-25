// src/services/residenteService.js
import api from './api';

export const residenteService = {
  getDashboard: () => {
    return api.get('/residente/dashboard/');
  },
  getObligaciones: (params) => {
    return api.get('/residente/obligaciones/', { params });
  },
  realizarPago: (data) => {
    return api.post('/residente/realizar-pago/', data);
  },
  getHistorialPagos: (params) => {
    return api.get('/residente/historial-pagos/', { params });
  },
  getComprobante: (id) => {
    return api.get(`/residente/comprobante/${id}/`);
  },
  getAvisos: () => {
    return api.get('/residente/avisos/');
  },
};