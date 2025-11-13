export enum Status {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export type Task = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  deadline: string;
  createdAt: Date;
  description?: string;
};
