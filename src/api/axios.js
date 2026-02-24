import axios from "axios";

const api = axios.create({
  baseURL: "https://efficient-jen-backenddevelopment-e889b079.koyeb.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;