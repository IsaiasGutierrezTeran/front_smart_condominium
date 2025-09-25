// src/services/adminService.js
import api from './api';

export const adminService = {
  getDashboard: () => {
    return api.get('/admin/dashboard/');
  },
  getUsuarios: (params) => {
    return api.get('/admin/usuarios/', { params });
  },
  crearUsuario: (data) => {
    return api.post('/admin/crear-usuario/', data);
  },
  getUnidades: (params) => {
    return api.get('/admin/unidades/', { params });
  },
  gestionarUnidad: (data) => {
    return api.post('/admin/gestionar-unidad/', data);
  },
  getConceptosPago: () => {
    return api.get('/admin/conceptos-pago/');
  },
  gestionarConcepto: (data) => {
    return api.post('/admin/gestionar-concepto/', data);
  },
  configurarRecordatorios: (data) => {
    return api.post('/admin/configurar-recordatorios/', data);
  },
  publicarAviso: (data) => {
    return api.post('/admin/publicar-aviso/', data);
  },
  getAvisosGenerales: (params) => {
    return api.get('/admin/avisos-generales/', { params });
  },
  getComunicados: (params) => {
    return api.get('/admin/comunicados/', { params });
  },
  gestionarComunicado: (data) => {
    return api.post('/admin/comunicados/', data);
  },
};