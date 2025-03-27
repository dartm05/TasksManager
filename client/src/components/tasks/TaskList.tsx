import React from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!tasks.length) return <p>No tasks found.</p>;

  

  return (
    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
