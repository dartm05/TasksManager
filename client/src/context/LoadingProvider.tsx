import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Spinner } from "../components/shared/Spinner";   

type LoadingContextType = {
  show: () => void;
  hide: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const show = () => setIsLoading(true);
  const hide = () => setIsLoading(false);

  useEffect(() => {
    (window as any).showLoading = show;   
    (window as any).hideLoading = hide;   
  }, []);

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner size="lg" />
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
