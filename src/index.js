// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Usar 'react-dom/client' en React 18
import App from './App';
import './index.css'; // Importa tus estilos globales si los tienes
import './assets/styles/global.scss';

// Crea el root con createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


