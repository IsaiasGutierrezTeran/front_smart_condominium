// src/pages/GestionUsuarios.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { apiService } from '../services/api';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await apiService.get('/admin/usuarios/');
      setUsuarios(data.usuarios || []);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivarDesactivar = async (usuarioId, activo) => {
    try {
      // Lógica para activar/desactivar usuario
      await apiService.put(`/admin/usuarios/${usuarioId}/`, { is_active: !activo });
      fetchUsuarios();
    } catch (error) {
      console.error('Error updating usuario:', error);
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <Button>Agregar Usuario</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Usuario</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Tipo</th>
                <th className="text-left p-4">Estado</th>
                <th className="text-left p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-b">
                  <td className="p-4">{usuario.nombre_completo}</td>
                  <td className="p-4">{usuario.email}</td>
                  <td className="p-4">{usuario.tipo_usuario_display}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      usuario.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {usuario.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button 
                      size="sm"
                      onClick={() => handleActivarDesactivar(usuario.id, usuario.is_active)}
                    >
                      {usuario.is_active ? 'Desactivar' : 'Activar'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestionUsuarios;