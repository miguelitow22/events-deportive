// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api', // Asegúrate de que esté usando la variable de entorno correctamente
});
console.log('API URL:', process.env.REACT_APP_API_URL);

// Interceptor para agregar el token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

export const loginUser = (email, password) => {
    return api.post('/usuarios/login', { email, password });
};

export const registerUser = (nombre, email, password, rol) => {
    return api.post('/usuarios', { nombre, email, password, rol });
};

export const fetchTorneos = () => {
    return api.get('/torneos');
};

export const fetchInscripciones = (userId) => {
    return api.get(`/inscripciones/${userId}`);
};
