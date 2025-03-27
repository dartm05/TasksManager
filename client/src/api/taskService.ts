import axios from "axios";
import { Task } from "utils/types";

const API_URL = "http://127.0.0.1:5001/task-manager-48639/us-central1/api";

export const getTasks = async (userId: string): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/${userId}/tasks`);
  return response.data;
};

export const createTask = async (
  task: { title: string; description: string },
  userId: string
): Promise<Task> => {
  const response = await axios.post(`${API_URL}/${userId}/tasks`, task);
  return response.data;
};

export const updateTask = async (
  id: string,
  updates: { title?: string; description?: string },
  userId: string
): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${userId}/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string, userId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${userId}/tasks/${id}`);
};
