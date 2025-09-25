// src/components/Layout/Layout.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navegación para residentes
  const residenteMenu = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/obligaciones', label: 'Mis Obligaciones', icon: '💰' },
    { path: '/historial-pagos', label: 'Historial de Pagos', icon: '📊' },
    { path: '/avisos', label: 'Avisos', icon: '📢' },
  ];

  // Navegación para administradores
  const administradorMenu = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/admin/usuarios', label: 'Gestión de Usuarios', icon: '👥' },
    { path: '/admin/unidades', label: 'Gestión de Unidades', icon: '🏢' },
    { path: '/admin/conceptos', label: 'Gestión de Conceptos', icon: '📋' },
    { path: '/admin/avisos', label: 'Gestión de Avisos', icon: '📢' },
    { path: '/admin/comunicados', label: 'Gestión de Comunicados', icon: '💬' },
  ];

  const menuItems = user?.tipo_usuario === 'ADMINISTRADOR' ? administradorMenu : residenteMenu;

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <span className="text-xl">☰</span>
              </button>
              <Link to="/" className="ml-4 text-xl font-bold text-gray-900">
                Smart Condominio
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700 hidden sm:block">
                    Hola, {user.first_name} {user.last_name}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.tipo_usuario === 'ADMINISTRADOR' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.tipo_usuario_display}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar para desktop */}
        {user && (
          <>
            {/* Overlay para mobile */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside className={`
              fixed md:static inset-y-0 left-0 z-30
              w-64 bg-white shadow-lg transform
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
              md:translate-x-0 transition duration-300 ease-in-out
              h-[calc(100vh-4rem)] mt-16
            `}>
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center p-3 rounded-lg transition-colors ${isActive(item.path)}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </>
        )}

        {/* Contenido principal */}
        <main className={`flex-1 min-h-screen ${user ? 'p-4 md:p-6' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;