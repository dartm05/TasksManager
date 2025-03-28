const TaskEditForm: React.FC<{
    editedTask: { title: string; description: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSave: () => void;
    handleCancel: () => void;
  }> = ({ editedTask, handleChange, handleSave, handleCancel }) => (
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
  );

  export default TaskEditForm;   