import { TaskService } from "./task.service";
import { Priority, Status, Task } from "./task.types";

export class TaskController {
    constructor(private taskService: TaskService) {}

    getAllTasks() {
        this.taskService.getAllTasks()
    }

    getDetailsById(id: string) {
        this.taskService.getDetailsById(id)
    }

    addTask(newTask: Task) {
        this.taskService.addTask(newTask)
    }

    updateTask(id: string, newTaskData: Partial<Task>) {
        this.taskService.updateTask(id, newTaskData)
    }

    deleteTask(id: string) {
        this.taskService.deleteTask(id)
    }

    filterByStatus(status: Status) {
        this.taskService.filterByStatus(status)
    }

    filterByPriority(priority: Priority) {
        this.taskService.filterByPriority(priority)
    }

    filterByCreatedAt(date: Date | string) {
        this.taskService.filterByCreatedAt(date)
    }

    checkDeadline(id: string) {
        this.taskService.checkDeadline(id)
    }
}