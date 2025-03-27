import axios from "axios";

const API_URL = "http://127.0.0.1:5001/task-manager-48639/us-central1/api/tasks";  

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task: { title: string; description: string }) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id: string, updates: { title?: string; description?: string; completed?: boolean }) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
