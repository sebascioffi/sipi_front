import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, expectedUser }) => {
  const isAuthenticated = !!localStorage.getItem('usuario');

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
