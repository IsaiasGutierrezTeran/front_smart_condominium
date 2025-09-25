// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';

// Páginas de Autenticación
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Páginas de Residentes
import DashboardResidente from './pages/Residente/DashboardResidente';
import Obligaciones from './pages/Obligaciones';
import HistorialPagos from './pages/HistorialPagos';
import Comprobante from './pages/Comprobante';
import Avisos from './pages/Avisos';

// Páginas de Administradores
import DashboardAdmin from './pages/DashboardAdmin';
import GestionUsuarios from './pages/GestionUsuarios';
import GestionUnidades from './pages/GestionUnidades';
import GestionConceptos from './pages/GestionConceptos';
import GestionAvisos from './pages/GestionAvisos';
import GestionComunicados from './pages/GestionComunicados';

// Componente de rutas protegidas
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (requiredRole && user.tipo_usuario !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas - Residentes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            {user?.tipo_usuario === 'ADMINISTRADOR' ? 
              <DashboardAdmin /> : <DashboardResidente />
            }
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/obligaciones" element={
        <ProtectedRoute requiredRole="RESIDENTE">
          <Layout>
            <Obligaciones />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/historial-pagos" element={
        <ProtectedRoute requiredRole="RESIDENTE">
          <Layout>
            <HistorialPagos />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/comprobante/:pagoId" element={
        <ProtectedRoute requiredRole="RESIDENTE">
          <Layout>
            <Comprobante />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/avisos" element={
        <ProtectedRoute>
          <Layout>
            <Avisos />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Rutas protegidas - Administradores */}
      <Route path="/admin/usuarios" element={
        <ProtectedRoute requiredRole="ADMINISTRADOR">
          <Layout>
            <GestionUsuarios />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/unidades" element={
        <ProtectedRoute requiredRole="ADMINISTRADOR">
          <Layout>
            <GestionUnidades />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/conceptos" element={
        <ProtectedRoute requiredRole="ADMINISTRADOR">
          <Layout>
            <GestionConceptos />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/avisos" element={
        <ProtectedRoute requiredRole="ADMINISTRADOR">
          <Layout>
            <GestionAvisos />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/comunicados" element={
        <ProtectedRoute requiredRole="ADMINISTRADOR">
          <Layout>
            <GestionComunicados />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;