import { Priority, Status } from '../task.types';

export class Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date | string = new Date();
  status: Status;
  priority: Priority;
  deadline: Date | string;

  constructor(id: string, title: string, description: string = "", deadline: Date | string, status: Status, priority: Priority) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.priority = priority;
    this.deadline = deadline;
    this.description = description;
  }

  getTaskInfo() {
    console.log("Task info: ============");
    console.log("id: ", this.id);
    console.log("title: ", this.title);
    console.log("description: ", this.description);
    console.log("status: ", this.status);
    console.log("priority: ", this.priority);
    console.log("deadline: ", this.deadline);
    console.log("createdAt: ", this.createdAt);
  }
}