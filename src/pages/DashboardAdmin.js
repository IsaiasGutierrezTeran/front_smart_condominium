// src/pages/DashboardAdmin.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { apiService } from '../services/api';

const DashboardAdmin = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await apiService.get('/admin/dashboard/');
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Administrador</h1>
      
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Unidades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData?.metricas?.total_unidades || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Residentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData?.metricas?.total_residentes || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Morosidad Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              ${dashboardData?.metricas?.morosidad_actual || 0}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pagos del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ${dashboardData?.metricas?.pagos_mes_actual || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Últimos pagos */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Últimos Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData?.ultimos_pagos?.map((pago) => (
              <div key={pago.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-semibold">{pago.residente_nombre}</p>
                  <p className="text-sm text-gray-600">{new Date(pago.fecha_pago).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${pago.monto_total}</p>
                  <p className="text-sm text-gray-600">{pago.metodo_pago}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAdmin;