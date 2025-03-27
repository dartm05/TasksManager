import { Button } from "components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import TaskList from "../components/tasks/TaskList";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleAddTask = () => {
    navigate("/add-task");
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-screen bg-yellow-50">
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
 
      <div className="ml-20 mt-10 w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg border border-yellow-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-800">Dashboard</h1>
          <Button
            onClick={handleAddTask}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-slate-700 transition"
            
          >
            <PlusCircle/>  Add Task
          </Button>
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
