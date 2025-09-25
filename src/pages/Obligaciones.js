// src/pages/Obligaciones.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { apiService } from '../services/api';

const Obligaciones = () => {
  const [obligaciones, setObligaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('PENDIENTE');

  useEffect(() => {
    fetchObligaciones();
  }, [filtroEstado]);

  const fetchObligaciones = async () => {
    try {
      const data = await apiService.get(`/residente/obligaciones/?estado=${filtroEstado}`);
      setObligaciones(data.obligaciones || []);
    } catch (error) {
      console.error('Error fetching obligaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePagar = async (obligacionId) => {
    try {
      await apiService.post('/residente/realizar-pago/', {
        obligaciones: [obligacionId],
        metodo_pago: 'TRANSFERENCIA'
      });
      alert('Pago realizado exitosamente');
      fetchObligaciones();
    } catch (error) {
      alert('Error al realizar el pago');
    }
  };

  if (loading) return <div>Cargando obligaciones...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis Obligaciones</h1>
        <select 
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="PENDIENTE">Pendientes</option>
          <option value="PAGADA">Pagadas</option>
          <option value="VENCIDA">Vencidas</option>
        </select>
      </div>

      <div className="grid gap-4">
        {obligaciones.map((obligacion) => (
          <Card key={obligacion.id} className={obligacion.estado === 'VENCIDA' ? 'border-red-300' : ''}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{obligacion.concepto_nombre}</h3>
                  <p className="text-sm text-gray-600">
                    Período: {obligacion.periodo} | 
                    Vence: {new Date(obligacion.fecha_vencimiento).toLocaleDateString()}
                  </p>
                  <p className={`text-lg font-bold ${
                    obligacion.estado === 'VENCIDA' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    ${obligacion.monto}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs ${
                    obligacion.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                    obligacion.estado === 'PAGADA' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {obligacion.estado}
                  </span>
                  {obligacion.estado === 'PENDIENTE' && (
                    <Button 
                      onClick={() => handlePagar(obligacion.id)}
                      className="ml-2"
                    >
                      Pagar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Obligaciones;