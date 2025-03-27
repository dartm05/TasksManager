import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskService";
import { useAuth } from "../context/AuthProvider";  
export function useTasks() {

  const { user } = useAuth();  
  const userId = user?.id;  

  const [tasks, setTasks] = useState<{ id: string; title: string; description: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) fetchTasks();  
  }, [userId]);

  const fetchTasks = async () => {
    if (!userId) return; 
    setLoading(true);
    try {
      const data = await getTasks(userId);
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: { title: string; description: string }) => {
    if (!userId) return;  
    try {
      const newTask = await createTask(task, userId);
      setTasks((prev) => [...prev, { ...newTask}]);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const editTask = async (id: string, updates: { title?: string; description?: string }) => {
    if (!userId) return;  
    try {
      const updatedTask = await updateTask(id, updates, userId);
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...updatedTask } : task)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const removeTask = async (id: string) => {
    if (!userId) return;  
    try {
      await deleteTask(id, userId);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return { tasks, loading, error, addTask, editTask, removeTask, fetchTasks };
}
