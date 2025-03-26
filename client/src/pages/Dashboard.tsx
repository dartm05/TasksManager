import { Button } from "components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "components/auth/AuthProvider";

const Dashboard = () => {
 
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
