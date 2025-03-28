import { Button } from "components/ui/button";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm/TaskForm";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

 
const Sidebar: React.FC = () => (
  <div className="absolute left-0 top-0 h-full w-16 bg-gray-200">
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="w-8 h-8 bg-gray-400 rounded-full shadow-md"
        ></div>
      ))}
    </div>
  </div>
);

 
const ModalOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-10"
    onClick={(e) => {
      e.stopPropagation();
      onClose();
    }}
  />
);

const Dashboard: React.FC = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { addTask, tasks, removeTask } = useTasks();

 
  const handleAddTask = () => setIsAddingTask(true);
  const handleCloseModal = () => setIsAddingTask(false);

  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-screen overflow-auto bg-yellow-50 bg-[repeating-linear-gradient(transparent_0_19px,_#facc15_20px)]">
 
      {isAddingTask && <ModalOverlay onClose={handleCloseModal} />}
      <Sidebar />
      <div className="ml-20 mt-10 h-full w-full max-w-[80vw] min-w-[370px] p-6 bg-white shadow-lg rounded-lg border border-yellow-300 overflow-auto">    
        <div className="flex justify-between min-w-[60vw] items-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-800">Dashboard</h1>
          <Button
            onClick={handleAddTask}
            className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-500 transition flex items-center"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="hidden sm:inline ml-2">Add Task</span>
          </Button>
        </div>

        {isAddingTask && <TaskForm onClose={handleCloseModal} addTask={addTask} />}

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 h-4/6">
            <img
              src="assets/empty.svg" 
              alt="No tasks available"
              className="w-64 h-64"
            />
            <p className="text-gray-600 mt-4 font-bold text-2xl">Oops!</p>
            <p className="text-gray-600 mt-2 font-bold text-xl">No tasks available</p>
          </div>
        ) : (
          <TaskList tasks={tasks} handleDeleteTask={removeTask} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
