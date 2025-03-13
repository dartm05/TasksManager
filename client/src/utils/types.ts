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