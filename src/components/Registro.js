// frontend/src/components/Registro.js
import React, { useState } from 'react';
import { registerUser } from '../services/api';
import '../assets/styles/Registro.scss';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('estudiante'); // Valor por defecto 'estudiante'
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(nombre, email, password, rol); // Asegúrate de enviar 'nombre', no 'name'
            console.log('Registro exitoso:', response.data);
            setMensaje('Usuario registrado exitosamente.');
            setError('');
            setNombre('');
            setEmail('');
            setPassword('');
            setRol('estudiante');
        } catch (error) {
            console.error('Error en el registro:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Hubo un problema al registrarse. Intente de nuevo.');
            setMensaje('');
        }
    };

    return (
        <div className="registro-container fade-in">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre completo"
                    required
                />
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
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="estudiante">Estudiante</option>
                    <option value="admin">Administrador</option>
                </select>
                {error && <div className="error-message">{error}</div>}
                {mensaje && <div className="success-message">{mensaje}</div>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Registro;
