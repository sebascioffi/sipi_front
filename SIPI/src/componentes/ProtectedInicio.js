import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedInicio = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('usuario');
  const usuario = localStorage.getItem('usuario');

  if (isAuthenticated) {
    // Redirigir a la ruta del usuario autenticado
    return <Navigate to={`/${usuario}`} replace />;
  } else {
    // Si no está autenticado, renderizar los componentes hijos
    return children;
  }
};

export default ProtectedInicio;
