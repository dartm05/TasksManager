import { useContext } from "react";
 
import { useNavigate } from "react-router-dom";
import AuthForm from "components/auth/AuthForm";

const Login = () => {
 // const { dispatch } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogin = (email: string) => {
   // dispatch({ type: "LOGIN", payload: email });
    navigate("/dashboard");
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
