import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Dashboard from 'pages/Dashboard';
import TaskProvider from 'context/TaskProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ModalProvider } from 'context/ModalProvider';
import { LoadingProvider } from 'context/LoadingProvider';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <LoadingProvider>
      <ModalProvider>
      <TaskProvider>
      <Routes>
        <Route path="/login" element={<Login  />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      </TaskProvider>
      </ModalProvider>
      </LoadingProvider>
    </Router>
  );
};

export default App;