import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { CircleX, Pencil } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
};

interface TaskItemProps {
  task: Task;
  handleDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleDelete }) => {
  const { editTask, removeTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await editTask(task.id, editedTask);
    task.title = editedTask.title;
    task.description = editedTask.description;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ title: task.title, description: task.description });
    setIsEditing(false);
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
        <>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full p-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full p-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Task Description"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="pb-10">
          <div className="text-justify max-h-[50px] overflow-y-auto">
            <h3 className="text-lg font-bold text-yellow-800">{task.title}</h3>
          </div>
          <div className="text-justify max-h-[100px] pt-5 overflow-y-scroll scrollbar scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
            <p className="text-gray-700">{task.description}</p>
          </div>
          </div>
          <div className="p-4 absolute bottom-0 right-0">
            <button
              onClick={handleEdit}
              className="text-sm text-yellow-600 hover:underline"
            >
              <Pencil />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
