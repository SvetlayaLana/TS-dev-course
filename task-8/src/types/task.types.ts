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

export type TaskDTO = {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  deadline: string;
}

export type TaskFilters = {
  status?: Status;
  priority?: Priority;
  createdAt?: string;
}
