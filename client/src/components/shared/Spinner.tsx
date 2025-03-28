import { Loader2 } from "lucide-react";  

export const Spinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const spinnerSize = size === "sm" ? "h-5 w-5" : size === "lg" ? "h-10 w-10" : "h-7 w-7";
  
  return <Loader2 className={`${spinnerSize} animate-spin`} />;
};
