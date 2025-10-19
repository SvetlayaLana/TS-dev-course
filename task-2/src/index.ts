import rawData from "./tasks.json"
import { Priority, schema, Status, Task } from "./dto/Task";
import { DEFAULT_PRIORITY, DEFAULT_STATUS } from "./constants";
import { z } from "zod";
import { isBefore, startOfDay } from "date-fns"

const tasksSchema = z.array(schema)
const parsedTasks: Task[] = tasksSchema.parse(rawData);

let tasks: Task[] = parsedTasks.map(item => ({
    ...item,
    priority: item.priority ?? DEFAULT_PRIORITY,
    status: item.status ?? DEFAULT_STATUS,
}))

const getDetails = (id: number | string): Task | string => {
    return tasks.find(item => item.id === id) || "No details found.";
}

const addTask = (newTask: Task): void => {
    const isIdExist = tasks.findIndex(item => item.id === newTask.id) > -1;

    if (!isIdExist) {
        tasks.push(newTask);
    } else {
        console.log(`Task with id:${newTask.id} already exists`);
    }
}

const updateTask = (id: string | number, newTaskData: Partial<Task>): void => {
    const taskToUpdateIdx = tasks.findIndex(item => item.id === id);

    if (taskToUpdateIdx > -1) {
       const updatedTask = {
           ...tasks[taskToUpdateIdx],
           ...newTaskData
       }
       tasks.splice(taskToUpdateIdx, 1, updatedTask)
    } else {
        console.log(`Task with id:${id} not found`);
    }
}

const deleteTask = (id: number | string): void => {
    const taskIdx = tasks.findIndex(task => task.id === id);

    if (taskIdx > -1) {
        tasks.splice(taskIdx, 1);
    } else {
        console.log(`Task with id:${id} not found`);
    }
}

const filterByStatus = (status: Status): Task[] => {
   return tasks.filter(item => item.status === status)
}

const filterByPriority = (priority: Priority): Task[] => {
    return tasks.filter(item => item.priority === priority)
}

const filterByCreatedAt = (date: Date | string): Task[] => {
    const target = new Date(date);
    const targetYear = target.getFullYear();
    const targetMonth = target.getMonth();
    const targetDay = target.getDate();

    return tasks.filter(item => {
        const created = new Date(item.createdAt);
        return (
            created.getFullYear() === targetYear &&
            created.getMonth() === targetMonth &&
            created.getDate() === targetDay
        );
    })
}

const checkDeadline = (id: string | number): string => {
    const task = tasks.find(item => item.id === id);

    if (task) {
        const isDeadlineFinished = isBefore(new Date(task.deadline), startOfDay(new Date()));

        if (isDeadlineFinished && task.status === Status.DONE) {
            return `Task id:${id} finished on time.`;
        } else if (isDeadlineFinished && task.status !== Status.DONE) {
            return `You've missed deadline for task id:${id} :(`
        } else {
            return `You have time to do task id:${id}.`;
        }
    }

    return `Task with id:${id} not found`;
}

console.log("Tasks list:", tasks)
console.log("Task 4 details:", getDetails(4))
addTask({
    id: "234",
    title: "Do homework",
    createdAt: new Date(),
    status: Status.TODO,
    priority: Priority.LOW,
    deadline: "2025-10-11"
});
console.log("Tasks list after addition", tasks)
updateTask(4, {
    description: "Doing something",
    status: Status.IN_PROGRESS
})
console.log("Tasks list after update", tasks)
deleteTask(4);
console.log("Tasks list after deletion:", tasks)
console.log("Filtered by 'todo' status:", filterByStatus(Status.DONE))
console.log("Filtered by 'high' status:", filterByPriority(Priority.HIGH))
console.log("Filtered by today created:", filterByCreatedAt(new Date()))
console.log(checkDeadline(0))


