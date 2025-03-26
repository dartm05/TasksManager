import { useEffect } from "react";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }
  , [user, navigate]);
  
  return <AuthForm type="login" onSubmit={login} />;
};

export default Login;
