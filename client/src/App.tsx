import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import Header from './components/layout/Header';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Dashboard from 'pages/Dashboard';
import TaskProvider from 'context/TaskProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ModalProvider } from 'context/ModalProvider';
import { LoadingProvider } from 'context/LoadingProvider';
import { useAuth } from 'context/AuthProvider';  

const App: React.FC = () => {
  const { user } = useAuth();  

  return (
    <Router>
      <Header />
      <LoadingProvider>
        <ModalProvider>
          <TaskProvider>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={user ? "/dashboard" : "/login"} />}
              />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
              <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </TaskProvider>
        </ModalProvider>
      </LoadingProvider>
    </Router>
  );
};

export default App;