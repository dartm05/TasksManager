import React from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { tasks, removeTask ,loading, error } = useTasks();

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!tasks.length) return <p>No tasks found.</p>;

  const handleDeleteTask = async (id: string) => {
    await removeTask(id);
  };

  return (
    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} handleDelete={handleDeleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
