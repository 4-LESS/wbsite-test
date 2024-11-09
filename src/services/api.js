/* Esta funcion no está siendo usada por conflictos en la API que
aun no se solucionan*/

import axios from 'axios';

const api = axios.create({
  baseURL: '/.netlify/functions/',
});

export default api;
