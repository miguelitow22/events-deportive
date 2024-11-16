import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Torneos.scss';

const Torneos = () => {
    const [torneos, setTorneos] = useState([]);

    // Función para manejar la inscripción
    const handleInscripcion = async (torneoId) => {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user'); // Obtener el 'user' como cadena

            // Verificamos si 'user' existe antes de parsearlo
            if (!user) {
                alert('Por favor, inicia sesión para inscribirte en un torneo.');
                return;
            }

            const userData = JSON.parse(user); // Parseamos solo si existe

            // Realizar la solicitud POST para la inscripción
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/inscripciones`, {
                usuario_id: userData.id, // Usamos el id del usuario parseado
                torneo_id: torneoId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('Inscripción exitosa');
            // Aquí podrías actualizar la lista de torneos o inscripciones
        } catch (error) {
            console.error('Error en la inscripción:', error);
            alert('Hubo un error al inscribirse. Intente nuevamente.');
        }
    };

    useEffect(() => {
        const fetchTorneos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/torneos`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTorneos(response.data);
            } catch (error) {
                console.error('Error fetching torneos:', error);
            }
        };
        fetchTorneos();
    }, []);

    return (
        <div className="torneos-container fade-in">
            <h2>Torneos Disponibles</h2>
            <div className="torneos-list">
                {torneos.length === 0 ? (
                    <p>No hay torneos disponibles en este momento.</p>
                ) : (
                    torneos.map(torneo => (
                        <div className="torneo-item" key={torneo.id_torneo}>
                            <h3>{torneo.nombre}</h3>
                            <p>{torneo.descripcion}</p>
                            <button onClick={() => handleInscripcion(torneo.id_torneo)}>Inscribirse</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Torneos;
