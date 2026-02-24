import api from "./axios";

// POST /api/auth/login
export const loginUser = async ({ email, password }) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

// POST /api/auth/register
export const registerUser = async ({ name, email, password, role }) => {
  const response = await api.post("/api/auth/register", { name, email, password, role });
  return response.data;
};