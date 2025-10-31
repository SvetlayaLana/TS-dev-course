import { Status, Priority } from "./task.types";
import { isBefore, startOfDay } from "date-fns";
import { Task } from "./models";

function NonBlankString(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]){
        const task = args.find(arg => arg && typeof arg === "object");

        if ("title" in task && !task.title) {
            console.log("No blank strings allowed");
            return
        }

        originalMethod.apply(this, args);
    }
}

function NonPastDeadlineDate(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]){
        const task = args.find(arg => arg && typeof arg === "object");

        if ("deadline" in task && isBefore(startOfDay(new Date(task.deadline)), startOfDay(new Date()))) {
            console.log("Deadline should not be in the past");
            return
        }

        originalMethod.apply(this, args);
    }
}

export class TaskService {
    private tasks: Task[] = []

    getAllTasks() {
        console.log("Tasks list: ", this.tasks)
    }

    getDetailsById(id: string) {
        const task = this.tasks.find(item => item.id === id)

        if (!task) {
            console.log("No details found.")
        } else {
            task.getTaskInfo()
        }
    }

    @NonBlankString
    @NonPastDeadlineDate
    addTask(newTask: Task) {
        const isIdExist = this.tasks.findIndex(item => item.id === newTask.id) > -1;

        if (!isIdExist) {
            this.tasks.push(newTask);
        } else {
            console.log(`Task with id:${newTask.id} already exists`);
        }
    }

    @NonBlankString
    @NonPastDeadlineDate
    updateTask(id: string, newTaskData: Partial<Task>) {
        const taskToUpdateIdx = this.tasks.findIndex(item => item.id === id);

        if (taskToUpdateIdx > -1) {
            const oldTask = this.tasks[taskToUpdateIdx];
            const updatedTask = {
                ...oldTask,
                ...newTaskData,
                getTaskInfo: oldTask.getTaskInfo,
            };
            this.tasks.splice(taskToUpdateIdx, 1, updatedTask)
        } else {
            console.log(`Task with id:${id} not found`);
        }
    }

    deleteTask(id: string) {
        const taskIdx = this.tasks.findIndex(task => task.id === id);

        if (taskIdx > -1) {
            this.tasks.splice(taskIdx, 1);
        } else {
            console.log(`Task with id:${id} not found`);
        }
    }

    filterByStatus(status: Status) {
        console.log(`filtered by ${status}: `, this.tasks.filter(item => item.status === status))
    }

    filterByPriority(priority: Priority) {
        console.log(`filtered by ${priority}: `, this.tasks.filter(item => item.priority === priority))
    }

    filterByCreatedAt(date: Date | string) {
        const target = new Date(date);
        const targetYear = target.getFullYear();
        const targetMonth = target.getMonth();
        const targetDay = target.getDate();

        const filtered = this.tasks.filter(item => {
            const created = new Date(item.createdAt);
            return (
                created.getFullYear() === targetYear &&
                created.getMonth() === targetMonth &&
                created.getDate() === targetDay
            );
        })

        console.log(`filtered by ${targetYear}-${targetMonth}-${targetDay}: `, filtered);
    }

    checkDeadline(id: string) {
        const task = this.tasks.find(item => item.id === id);

        if (task) {
            const isDeadlineFinished = isBefore(new Date(task.deadline), startOfDay(new Date()));

            if (isDeadlineFinished && task.status === Status.DONE) {
                console.log(`Task id:${id} finished on time.`);
            } else if (isDeadlineFinished && task.status !== Status.DONE) {
                console.log(`You've missed deadline for task id:${id} :(`)
            } else {
                console.log(`You have time to do task id:${id}.`);
            }
        } else {
            console.log(`Task with id:${id} not found`);
        }
    }
}