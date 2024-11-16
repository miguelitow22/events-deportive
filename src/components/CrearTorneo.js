// frontend/src/components/CrearTorneo.js
import React, { useState } from 'react';
import axios from 'axios';

const CrearTorneo = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    const handleCrearTorneo = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debes iniciar sesión para crear un torneo.');
                return;
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/torneos`, {
                nombre,
                descripcion,
                fecha
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMensajeExito('Torneo creado con éxito.');
            setNombre('');
            setDescripcion('');
            setFecha('');
        } catch (error) {
            console.error('Error al crear el torneo:', error);
            setError('Hubo un problema al crear el torneo. Intenta de nuevo.');
            setMensajeExito('');
        }
    };

    return (
        <div className="crear-torneo-container">
            <h2>Crear Torneo</h2>
            <form onSubmit={handleCrearTorneo}>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Nombre del Torneo" 
                    required
                />
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción"
                    required
                />
                <input 
                    type="date" 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)} 
                    required
                />
                {error && <div className="error-message">{error}</div>}
                {mensajeExito && <div className="success-message">{mensajeExito}</div>}
                <button type="submit">Crear Torneo</button>
            </form>
        </div>
    );
};

export default CrearTorneo;
