import React, { useState } from "react";
import { useTasks } from "../../../hooks/useTasks";

import { CircleX } from "lucide-react";

import { TaskItemProps } from "../../../utils/types";

import TaskEditForm from "./TaskEditForm";
import TaskView from "./TaskView";
 
const TaskItem: React.FC<TaskItemProps> = ({ task, handleDelete }) => {
  const { editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

 
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setEditedTask({ title: task.title, description: task.description });
    setIsEditing(false);
  };
  const handleSave = async () => {
    await editTask(task.id, editedTask);
    task.title = editedTask.title;
    task.description = editedTask.description;
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative border-2 border-yellow-300 bg-yellow-50 shadow-lg rounded-lg p-4 space-y-4">
      <button
        onClick={() => handleDelete(task.id)}
        className="absolute -top-2 -right-2 text-white hover:text-black transition"
      >
        <CircleX fill="red" className="w-7 h-7" />
      </button>

      {isEditing ? (
        <TaskEditForm
          editedTask={editedTask}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <TaskView task={task} handleEdit={handleEdit} />
      )}
    </div>
  );
};

export default TaskItem;
