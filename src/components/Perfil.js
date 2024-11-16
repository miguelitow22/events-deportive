import React, { useState, useEffect } from 'react';

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user'); // Obtener información del usuario del localStorage
    if (userData) {
      setUser(JSON.parse(userData)); // Solo parsear si 'user' existe
    } else {
      // Si no hay sesión iniciada, redirigir al login
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="perfil-container">
      {user ? (
        <div>
          <h2>Bienvenido, {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Rol: {user.rol}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Perfil;
