import axios from "axios";
import Cookies from "js-cookie";

// Criação da instância do axios com a URL base
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar tokens de autenticação
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token") || process.env.NEXT_PUBLIC_API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Erro na resposta:", error.response.data);
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
    } else {
      console.error("Erro:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
