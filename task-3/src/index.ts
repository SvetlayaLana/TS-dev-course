import {Bug, Epic, Priority, Status, Story, SubTask, Task} from "./modules/tasks/task.types";
import {nanoid} from "nanoid";
import {addDays} from "date-fns";
import {TaskService} from "./modules/tasks/task.service";
import {TaskController} from "./modules/tasks/task.controller";

const task = new Task(nanoid(), "Go for a walk", "", addDays(new Date(), 3), Status.TODO, Priority.MEDIUM)
const subTask = new SubTask(nanoid(), "Dress up", "", addDays(new Date(), 1), Status.DONE, Priority.LOW, task)
const bug = new Bug(nanoid(), "Forgotten hat", "AR: had has been forgotten; ER: hat is on the head", new Date(), Status.IN_PROGRESS, Priority.HIGH, true)
const epic = new Epic(nanoid(), "Healthcare", "", addDays(new Date(), 31), Status.IN_PROGRESS, Priority.HIGH, "Health")
const story = new Story(nanoid(), "Increase physical activity", "", addDays(new Date(), 31), Status.IN_PROGRESS, Priority.HIGH, 13)

const taskService = new TaskService()
const taskController = new TaskController(taskService)

taskController.addTask(task);
taskController.addTask(subTask);
taskController.addTask(bug);
taskController.addTask(epic);
taskController.addTask(story);

taskController.getAllTasks()
taskController.getDetailsById(task.id)
taskController.updateTask(task.id, { status: Status.IN_PROGRESS })
taskController.getAllTasks()
taskController.deleteTask(epic.id)
taskController.filterByStatus(Status.IN_PROGRESS)
taskController.checkDeadline(subTask.id)
