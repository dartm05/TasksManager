export type Task = {
    id: string;
    title: string;
    description: string;
};

export type Status = 'active' | 'completed';

export type TaskWithStatus = Task & {
    status: Status;
};

export type User = {
    id: string;
    name: string;
    email: string;
};

// AuthForm.tsx
export interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string) => void;
}

// TaskForm.tsx
export interface TaskFormProps {
  onClose: () => void;
  addTask: (task: { title: string; description: string }) => Promise<void>;
}

export interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  isTextArea?: boolean;
}

// TaskList.tsx
export interface TaskListProps {
  tasks: Task[];
  handleDeleteTask: (id: string) => void;
}

//TaskItem.tsx
export interface TaskItemProps {
    task: Task;
    handleDelete: (id: string) => void;
}

// TaskProvider.tsx
export type TaskContextType = {
    tasks: Task[];
    createTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
};

// AuthProvider.tsx
export type AuthContextType = {
    user?: User | null;
    register: (email: string) => Promise<void>;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
};

// LoadingProvider.tsx
export type LoadingContextType = {
  show: () => void;
  hide: () => void;
};

//ModalProvider.tsx
export type ModalContextType = {
  show: (message: string) => void;
  hide: () => void;
};

// ErrorDialog.tsx
export interface ErrorDialogProps {
    error: string | null;
    clearError: () => void;
  }


