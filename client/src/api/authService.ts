import api from "./httpService";

export const loginUser = async (email: string) => {
  const response = await api.get(`/users/${email}`);
  return response.data;
};

export const registerUser = async (email: string) => {
  const response = await api.post("/users", { email });
  return response.data;
};