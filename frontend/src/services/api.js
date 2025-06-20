import axios from 'axios';

// Cria uma instância do axios com a URL base da API
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', 
});

export default api;
