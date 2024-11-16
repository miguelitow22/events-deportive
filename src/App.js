import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import Torneos from './components/Torneos';
import Partidos from './components/Partidos';
import Perfil from './components/Perfil'; // Importa Perfil

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/torneos" element={<Torneos />} />
        <Route path="/partidos/:torneoId" element={<Partidos />} />
        <Route path="/perfil" element={<Perfil />} /> 
      </Routes>
    </Router>
  );
}

export default App;
