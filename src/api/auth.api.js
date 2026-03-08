const BASE_URL = "https://complaintbackend.vercel.app";

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let error = {};
    try {
      error = await response.json();
    } catch (_) {}
    throw { response: { data: error } };
  }

  return response.json();
};

export const registerUser = async ({ name, email, password, role }) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!response.ok) {
    let error = {};
    try {
      error = await response.json();
    } catch (_) {}
    throw { response: { data: error } };
  }

  return response.json();
};