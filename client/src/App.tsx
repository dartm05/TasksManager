import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Dashboard from 'pages/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login  />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={Dashboard} />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;