import React from "react";
import TaskItem from "./TaskItem/TaskItem";
import { TaskListProps } from "../../utils/types";

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
