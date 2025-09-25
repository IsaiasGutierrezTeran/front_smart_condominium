// src/pages/Avisos.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/Card';
import { apiService } from '../services/api';

const Avisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvisos();
  }, []);

  const fetchAvisos = async () => {
    try {
      const data = await apiService.get('/residente/avisos/');
      setAvisos(data);
    } catch (error) {
      console.error('Error fetching avisos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando avisos...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Avisos y Comunicados</h1>
      
      <div className="space-y-4">
        {avisos.map((aviso) => (
          <Card key={aviso.id} className={
            aviso.prioridad === 'ALTA' ? 'border-red-200 bg-red-50' :
            aviso.prioridad === 'MEDIA' ? 'border-yellow-200 bg-yellow-50' :
            'border-blue-200 bg-blue-50'
          }>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{aviso.titulo}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  aviso.prioridad === 'ALTA' ? 'bg-red-100 text-red-800' :
                  aviso.prioridad === 'MEDIA' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {aviso.prioridad_display}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{aviso.contenido}</p>
              <div className="mt-2 text-sm text-gray-500">
                Publicado por: {aviso.publicado_por_nombre} • 
                Fecha: {new Date(aviso.fecha_publicacion).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Avisos;