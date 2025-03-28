import React, { useState } from "react";
import { TaskFormProps } from "../../../utils/types";
import FormField from "../TaskForm/FormField";

const TaskForm: React.FC<TaskFormProps> = ({ onClose, addTask }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTask(formData);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFormData({ title: "", description: "" });
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-50 border-2 border-yellow-300 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-10 font-handwritten"
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-800">New Task</h1>

        <FormField
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
 
        <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          isTextArea
        />

        <div className="flex justify-between mt-4 gap-5">
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-2xl hover:bg-yellow-600 transition"
          >
            Save Task
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-2xl hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;