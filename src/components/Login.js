// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usar useNavigate en lugar de useHistory
import { loginUser } from '../services/api'; // Asegúrate de tener la función loginUser correctamente definida
import '../assets/styles/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate(); // Usar el hook useNavigate para redirigir

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((response) => {
        try {
          const data = response.data; // Verifica que la respuesta tenga datos válidos
          if (data && data.token) {
            // Guardar el token y la información del usuario
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // Guardar el usuario en localStorage
            
            setMensajeExito('Login exitoso. Redirigiendo...'); // Mostrar mensaje de éxito
            navigate('/'); // Redirigir a la página de perfil o inicio
          } else {
            setError('Datos incorrectos o falta de respuesta adecuada.');
          }
        } catch (error) {
          console.error('Error al procesar la respuesta del login', error);
          setError('Hubo un error procesando la respuesta.');
        }
      })
      .catch((error) => {
        console.error('Error en el login', error);
        setError(error.response?.data?.error || 'Error desconocido');
        setMensajeExito('');
      });
  };

  return (
    <div className="login-container fade-in">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Correo electrónico" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Contraseña" 
          required 
        />
        {error && <div className="error-message">{error}</div>} {/* Muestra mensaje de error */}
        {mensajeExito && <div className="success-message">{mensajeExito}</div>} {/* Muestra mensaje de éxito */}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
