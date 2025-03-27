import AuthForm from "../components/auth/AuthForm";
import useRedirectIfAuthenticated from "hooks/useRedirect";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const { login } = useAuth();
  useRedirectIfAuthenticated();
  return <AuthForm type="login" onSubmit={login} />;
};

export default Login;
