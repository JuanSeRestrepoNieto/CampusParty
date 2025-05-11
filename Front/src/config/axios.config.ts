import axios from 'axios';

// Configuración base de axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self';"
  }
});

// Interceptor para agregar headers a todas las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    // Agrega el CSP header si no existe
    if (!config.headers['Content-Security-Policy']) {
      config.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self';";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;