import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from './auth';

export const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export const AdminRoute = ({ children }) => {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/dashboard" replace />;
};
