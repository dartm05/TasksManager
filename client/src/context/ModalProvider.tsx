import ErrorDialog from "../components/shared/ErrorDialog";
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import { ModalContextType } from "../utils/types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const show = (message: string) => setMessage(message);
  const hide = () => setMessage(null);

 
  const showRef = useRef(show);

  useEffect(() => {
    showRef.current = show;
    (window as any).showErrorModal = show;  
  }, [show]);

  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}
      {message && <ErrorDialog error={message} clearError={hide} />}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

