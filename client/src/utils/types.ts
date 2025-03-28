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