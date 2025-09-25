// src/pages/HistorialPagos.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/Card';
import { apiService } from '../services/api';

const HistorialPagos = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistorialPagos();
  }, []);

  const fetchHistorialPagos = async () => {
    try {
      const data = await apiService.get('/residente/historial-pagos/');
      setPagos(data.pagos || []);
    } catch (error) {
      console.error('Error fetching historial de pagos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando historial de pagos...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Historial de Pagos</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Mis Pagos Realizados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pagos.map((pago) => (
              <div key={pago.id} className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-semibold">Comprobante: {pago.id}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(pago.fecha_pago).toLocaleDateString()} - 
                    {new Date(pago.fecha_pago).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">${pago.monto_total}</p>
                  <p className="text-sm text-gray-600">{pago.metodo_pago}</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    pago.estado === 'COMPLETADO' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pago.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorialPagos;