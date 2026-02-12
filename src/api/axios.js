import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // later replace
});

export default api;
