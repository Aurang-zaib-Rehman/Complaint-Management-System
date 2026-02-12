import api from "./axios";

// GET all complaints
export const getComplaints = async () => {
  const response = await api.get("/complaints");
  return response.data;
};

// POST new complaint
export const submitComplaint = async (data) => {
  const response = await api.post("/complaints", data);
  return response.data;
};
