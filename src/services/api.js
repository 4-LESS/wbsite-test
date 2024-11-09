// src/services/api.js

// Configuración de Axios para realizar solicitudes a la API.
// Esta función no está en uso actualmente debido a conflictos con la API pendientes

import axios from 'axios';

// Crea una instancia de Axios con una URL base para la API
const api = axios.create({
  baseURL: '/.netlify/functions/', // Define la URL base de la API, relativa a Netlify Functions
});

export default api;
