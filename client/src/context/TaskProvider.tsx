import { createContext, useContext, useState } from 'react';
import { Task } from '../utils/types';
import { TaskContextType } from '../utils/types';

const TaskContext = createContext<TaskContextType|undefined>(undefined);

export default function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const createTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    const updateTask = (task: Task) => {
        const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
        setTasks(updatedTasks);
    };

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
        {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
}