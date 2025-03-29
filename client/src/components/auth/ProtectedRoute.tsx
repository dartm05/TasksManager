import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthProvider';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { user } = useAuth();
  return user ? <Component /> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;