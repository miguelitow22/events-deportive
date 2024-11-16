// frontend/src/components/InscripcionesList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InscripcionesList = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Obtener usuario desde localStorage

    useEffect(() => {
        const fetchInscripciones = async () => {
            try {
                if (!user) {
                    alert('Por favor, inicia sesión para ver tus inscripciones.');
                    return;
                }

                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/inscripciones/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInscripciones(response.data);
            } catch (error) {
                console.error('Error al cargar las inscripciones', error);
            }
        };

        fetchInscripciones();
    }, [user]);

    return (
        <div className="inscripciones-list">
            <h2>Mis Inscripciones</h2>
            <ul>
                {inscripciones.length === 0 ? (
                    <li>No tienes inscripciones aún.</li>
                ) : (
                    inscripciones.map(inscripcion => (
                        <li key={inscripcion.id_inscripcion}>
                            <p>Torneo ID: {inscripcion.torneo_id}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default InscripcionesList;
