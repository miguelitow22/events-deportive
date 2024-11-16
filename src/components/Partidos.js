import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Partidos.scss';

const Partidos = ({ torneoId }) => {
    const [partidos, setPartidos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!torneoId) return; // Asegura que el torneoId esté disponible

        axios.get(`http://localhost:4000/api/partidos/${torneoId}`)
            .then(response => {
                setPartidos(response.data);
            })
            .catch(error => {
                setError('Error al obtener los partidos');
                console.error('Error fetching partidos:', error);
            });
    }, [torneoId]);

    return (
        <div className="partidos-container fade-in">
            <h2>Partidos del Torneo</h2>
            {error && <p>{error}</p>}
            <div className="partidos-list">
                {partidos.length === 0 ? (
                    <p>No hay partidos para este torneo.</p>
                ) : (
                    partidos.map(partido => (
                        <div className="partido-item" key={partido.id_partido}>
                            <p>{partido.equipo_local} vs {partido.equipo_visitante}</p>
                            <p>{new Date(partido.fecha).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Partidos;
