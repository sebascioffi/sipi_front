import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ProtectedRoute = ({ children, expectedUser }) => {
  const isAuthenticated = !!localStorage.getItem('usuario');
  const { nom_usuario } = useParams();

  if (isAuthenticated && localStorage.getItem('usuario') === nom_usuario) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
