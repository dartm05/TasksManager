import AuthForm from "components/auth/AuthForm";
import useRedirectIfAuthenticated from "hooks/useRedirect";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
  const { register } = useAuth();
  useRedirectIfAuthenticated();
  return <AuthForm type="register" onSubmit={register} />;
};

export default Register;
