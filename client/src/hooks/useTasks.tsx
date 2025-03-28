import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskService";
import { useAuth } from "../context/AuthProvider";  

export function useTasks() {

  const { user } = useAuth();  
  const userId = user?.id;  
  
  const [tasks, setTasks] = useState<{ id: string; title: string; description: string}[]>([]);
  
  useEffect(() => {
    if (userId) fetchTasks();  
  }, [userId]);
  
  const fetchTasks = async () => {
    if (!userId) return; 
    
    try {
      const data = await getTasks(userId);
      setTasks(data);
    } catch (err) {} 
  };
  
  const addTask = async (task: { title: string; description: string }) => {
    if (!userId) return;  
    try {
      const newTask = await createTask(task, userId);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {}
  };
  
  const editTask = async (id: string, updates: { title?: string; description?: string }) => {
    if (!userId) return;  
    try {
      const updatedTask = await updateTask(id, updates, userId);
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...updatedTask } : task)));
    } catch (err) {}
  };
  
  const removeTask = async (id: string) => {
    if (!userId) return;  
    try {
      await deleteTask(id, userId);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {}
  };
  
  return { tasks, addTask, editTask, removeTask, fetchTasks };
}
