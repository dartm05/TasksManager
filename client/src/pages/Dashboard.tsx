import { useContext } from "react";
 
import { Button } from "components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
 
  const navigate = useNavigate();

  const handleLogout = () => {
 
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
