import React, { useState } from "react";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description });
    // TODO: Add logic to handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-yellow-50 border-2 border-yellow-300 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-10 font-handwritten"
    >
      <h1 className="text-2xl font-bold text-center mb-4 text-yellow-800">New Task</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block text-yellow-700 font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full p-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-yellow-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={5}
          className="w-full p-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition"
      >
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;