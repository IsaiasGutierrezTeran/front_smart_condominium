// src/pages/Residente/DashboardResidente.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { apiService } from '../../services/api';
import { Link } from 'react-router-dom';

const DashboardResidente = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await apiService.get('/residente/dashboard/');
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Residente</h1>
        <Link to="/obligaciones">
          <Button>Ver Mis Obligaciones</Button>
        </Link>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Pendiente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              ${dashboardData?.resumen?.total_pendiente || '0.00'}
            </p>
            <p className="text-sm text-gray-600">Obligaciones por pagar</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pagado este Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              ${dashboardData?.resumen?.total_pagado_mes || '0.00'}
            </p>
            <p className="text-sm text-gray-600">Pagos realizados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Unidades Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {dashboardData?.resumen?.unidades_activas || 0}
            </p>
            <p className="text-sm text-gray-600">Tus unidades</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Obligaciones Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              {dashboardData?.resumen?.obligaciones_pendientes || 0}
            </p>
            <p className="text-sm text-gray-600">Por vencer</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Avisos recientes */}
        <Card>
          <CardHeader>
            <CardTitle>Avisos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.avisos_recientes?.map((aviso) => (
                <div key={aviso.id} className="p-3 border rounded-lg">
                  <h3 className="font-semibold text-gray-900">{aviso.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {aviso.contenido}
                  </p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Por: {aviso.publicado_por_nombre}</span>
                    <span>{new Date(aviso.fecha_publicacion).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {(!dashboardData?.avisos_recientes || dashboardData.avisos_recientes.length === 0) && (
                <p className="text-gray-500 text-center py-4">No hay avisos recientes</p>
              )}
            </div>
            <Link to="/avisos" className="block text-center mt-4 text-blue-600 hover:text-blue-800">
              Ver todos los avisos
            </Link>
          </CardContent>
        </Card>

        {/* Próximos vencimientos */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Vencimientos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData?.proximos_vencimientos?.map((obligacion) => (
                <div key={obligacion.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{obligacion.concepto_nombre}</p>
                    <p className="text-sm text-gray-600">
                      Vence: {new Date(obligacion.fecha_vencimiento).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${obligacion.monto}</p>
                    <p className="text-sm text-gray-600">{obligacion.periodo}</p>
                  </div>
                </div>
              ))}
              {(!dashboardData?.proximos_vencimientos || dashboardData.proximos_vencimientos.length === 0) && (
                <p className="text-gray-500 text-center py-4">No hay vencimientos próximos</p>
              )}
            </div>
            <Link to="/obligaciones" className="block text-center mt-4 text-blue-600 hover:text-blue-800">
              Ver todas las obligaciones
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Unidades del residente */}
      {dashboardData?.unidades && dashboardData.unidades.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mis Unidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.unidades.map((unidad) => (
                <div key={unidad.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">{unidad.torre_nombre}-{unidad.numero}</h3>
                  <p className="text-sm text-gray-600">Tipo: {unidad.tipo}</p>
                  <p className="text-sm text-gray-600">Alicuota: ${unidad.alicuota}</p>
                  <p className="text-sm text-gray-600">
                    Residentes: {unidad.residentes_actuales?.join(', ') || 'No asignados'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardResidente;