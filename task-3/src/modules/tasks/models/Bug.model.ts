import { Priority, Status } from '../task.types';
import { Task } from './Task.model';

export class Bug extends Task {
  isBlocker: boolean;

  constructor(id: string, title: string, description: string, deadline: string | Date, status: Status, priority: Priority, isBlocker: boolean) {
    super(id, title, description, deadline, status, priority);
    this.isBlocker = isBlocker;
  }

  getTaskInfo() {
    super.getTaskInfo();
    console.log("is blocker: ", this.isBlocker)
  }
}