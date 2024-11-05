import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  // No añadiremos autenticación por ahora
});

export default api;
