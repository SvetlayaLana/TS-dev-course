import { Priority, Status } from '../task.types';
import { Task } from './Task.model';

export class Epic extends Task {
  epicName: string;

  constructor(id: string, title: string, description: string, deadline: string | Date, status: Status, priority: Priority, epicName: string) {
    super(id, title, description, deadline, status, priority);
    this.epicName = epicName;
  }

  getTaskInfo() {
    super.getTaskInfo();
    console.log("epic name: ", this.epicName)
  }
}