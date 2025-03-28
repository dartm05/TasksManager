import React from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  
  const { tasks, removeTask  } = useTasks();

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
