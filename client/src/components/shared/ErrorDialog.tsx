import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorDialogProps {
  error: string | null;
  clearError: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ error, clearError }) => {
  return (
    <Dialog open={!!error} onOpenChange={clearError}>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg bg-white">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-red-700 w-6 h-6" />
            <DialogTitle className="text-lg font-semibold text-red-700">Error</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-gray-600 mt-2">{error}</DialogDescription>
        </DialogHeader>
        <Button onClick={clearError} className="w-full bg-red-700 hover:bg-red-600">
          Dismiss
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
