import { useNavigate } from "react-router-dom";
import AuthForm from "components/auth/AuthForm";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (email: string) => {
    navigate("/login");
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default Register;
