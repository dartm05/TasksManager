import React from "react";
import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../utils/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  handleDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, handleDeleteTask }) => {
  
  return (
    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} handleDelete={handleDeleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
