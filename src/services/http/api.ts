import axios from "axios";

const api = axios.create({
  // http://localhost:3000
  baseURL: "",
});

export default api;
