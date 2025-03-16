import React from 'react';
import  Header  from './components/layout/Header';
import { BrowserRouter as Router } from "react-router-dom";
import Login from 'pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Login />
    </Router>
  );
};

export default App;