import { Task } from "utils/types";
import api from "./httpService";

export const getTasks = async (userId: string): Promise<Task[]> => {
  const response = await api.get(`${userId}/tasks`);
  return response.data;
};

export const createTask = async (
  task: { title: string; description: string },
  userId: string
): Promise<Task> => {
  const response = await api.post(`${userId}/tasks`, task);
  return response.data;
};

export const updateTask = async (
  id: string,
  updates: { title?: string; description?: string },
  userId: string
): Promise<Task> => {
  const response = await api.put(`${userId}/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string, userId: string): Promise<void> => {
  await api.delete(`${userId}/tasks/${id}`);
};
