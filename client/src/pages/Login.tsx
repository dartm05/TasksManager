import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../components/auth/AuthProvider";

const Login = () => {
 
  const { login } = useAuth();

  return <AuthForm type="login" onSubmit={login} />;
};

export default Login;
