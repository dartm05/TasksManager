import { Loader2 } from "lucide-react";  

export const Spinner = ( ) => {
  return <Loader2 className={`w-24 h-24 sm:w-24 sm:h-24 md:w-32 md:h-32 text-slate-800 bg-slate-400 rounded-full animate-spin`} />;
};
