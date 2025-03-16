import { useState } from "react";
import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password?: string) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center h-screen p-4 overflow-auto">
      <Card className="h-auto w-full max-w-3xl shadow-2xl">
        <CardContent className="p-6 md:p-14 space-y-4 md:space-x-8 flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 space-y-4 items-center">
            <div className="flex flex-col items-center space-y-16">
              <div className="flex items-center space-x-2">
                <img src="/assets/check.png" alt="Logo" className="w-8 h-8 mr-2" />
                <h1 className="text-2xl font-bold text-center">Task Manager</h1>
              </div>
              <h2 className="text-2xl font-bold self-start">{type === "login" ? "Login" : "Register"}</h2>
            </div>
            <div className="space-y-32 justify-center items-center">
              <div className="flex flex-col items-center space-y-3">
                <Label className="self-start">Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full mb-4" />
              </div>
              <div className="flex flex-col items-center space-y-5">
                <Button className="w-3/4 mt-4" onClick={() => onSubmit(email, password)}>
                  {type === "login" ? "Login" : "Register"}
                </Button>
                <div>
                  <p className="text-center justify-center">
                    {type === "login"
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <Button
                      variant={"link"}
                      className="ml-2"
                      onClick={() =>
                        type === "login" ? onSubmit(email, password) : onSubmit(email)
                      }
                    >
                      {type === "login" ? "Register" : "Login"}
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:w-1/2 items-center justify-center mt-4 md:mt-0">
            <img src="/assets/to-do.svg" alt="Auth" className="w-full h-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
