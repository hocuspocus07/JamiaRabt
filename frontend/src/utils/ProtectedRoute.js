import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    return token ? children : <Navigate to="/signup" replace />;
  };
  

export default ProtectedRoute;
