// src/services/authService.js
import api from './api';

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login/', { email, password });
  },
  registro: (userData) => {
    return api.post('/auth/registro/', userData);
  },
};