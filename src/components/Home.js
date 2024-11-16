import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Partidos from './Partidos'; // Asegúrate de importar el componente de partidos

function Home() {
  const [usuario, setUsuario] = useState(null);
  const [torneos, setTorneos] = useState([]);
  const [selectedTorneoId, setSelectedTorneoId] = useState(null); // Estado para almacenar el torneo seleccionado
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirigir al login si no está autenticado
    } else {
      // Obtener los datos del usuario logueado
      fetch('http://localhost:4000/api/usuarios/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setUsuario(data);
          }
        })
        .catch(err => setError('Error al obtener los datos del usuario'));
    }

    // Obtener los torneos disponibles
    fetch('http://localhost:4000/api/torneos')
      .then(res => res.json())
      .then(data => {
        setTorneos(data);
      })
      .catch(err => setError('Error al cargar los torneos'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };

  const handleInscripcion = (torneoId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:4000/api/torneos/inscripcion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        usuario_id: usuario.id_usuario,
        torneo_id: torneoId
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          alert('Inscripción exitosa');
        }
      })
      .catch(err => setError('Error al inscribir al torneo'));
  };

  return (
    <div>
      <h1>Bienvenido a la página de torneos</h1>

      {error && <p>{error}</p>}

      {usuario ? (
        <div>
          <p>Hola, {usuario.nombre}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>

          <h2>Torneos Disponibles</h2>
          <div>
            {torneos.length > 0 ? (
              torneos.map(torneo => (
                <div key={torneo.id_torneo}>
                  <p>{torneo.nombre}</p>
                  <button onClick={() => setSelectedTorneoId(torneo.id_torneo)}>
                    Ver Partidos
                  </button>
                  <button onClick={() => handleInscripcion(torneo.id_torneo)}>
                    Inscribirse
                  </button>
                </div>
              ))
            ) : (
              <p>No hay torneos disponibles actualmente.</p>
            )}
          </div>

          {/* Mostrar los partidos del torneo seleccionado */}
          {selectedTorneoId && <Partidos torneoId={selectedTorneoId} />}
        </div>
      ) : (
        <p>Por favor, inicia sesión para ver los torneos.</p>
      )}
    </div>
  );
}

export default Home;
