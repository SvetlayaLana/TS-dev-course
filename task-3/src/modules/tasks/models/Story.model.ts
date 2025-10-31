import { Priority, Status } from '../task.types';
import { Task } from './Task.model';

export class Story extends Task {
  storyPoints: number;

  constructor(id: string, title: string, description: string, deadline: string | Date, status: Status, priority: Priority, storyPoints: number) {
    super(id, title, description, deadline, status, priority);
    this.storyPoints = storyPoints;
  }

  getTaskInfo() {
    super.getTaskInfo();
    console.log("story points: ", this.storyPoints)
  }
}