import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState<{ id: string; title: string; description: string; completed: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: { title: string; description: string }) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const editTask = async (id: string, updates: { title?: string; description?: string; completed?: boolean }) => {
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return { tasks, loading, error, addTask, editTask, removeTask, fetchTasks };
}
