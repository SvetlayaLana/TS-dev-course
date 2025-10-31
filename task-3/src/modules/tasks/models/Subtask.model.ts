import { Priority, Status } from '../task.types';
import { Task } from './Task.model';

export class SubTask extends Task {
  parentTask: Task;

  constructor(id: string, title: string, description: string, deadline: string | Date, status: Status, priority: Priority, parentTask: Task) {
    super(id, title, description, deadline, status, priority);
    this.parentTask = parentTask;
  }

  getTaskInfo() {
    super.getTaskInfo();
    console.log("parent task id: ", this.parentTask.id)
  }
}