import './style.css'
import { addTask, getAllTasks } from "./api"
import { type Task } from "./types";
import { nanoid } from "nanoid";

const displayTasks = (tasks: Task[]) => {
    const list = document.querySelector<HTMLUListElement>('#tasks-list')

    const tasksElements = tasks.map((task) => {
        const li = document.createElement('li');
        li.className = "p-4 rounded-lg flex flex-col gap-2 shadow-sm bg-sky-50 hover:bg-sky-50 hover:shadow-lg"
        li.innerHTML = `
        <div class="flex gap-2">
            <span class="font-semibold">Title: </span>
            <span>${task.title}</span>
        </div>
        <div class="flex gap-2">
            <span class="font-semibold">Description: </span>
            <span>${task.description || "--"}</span>
        </div>
        <div class="flex gap-2">
            <span class="font-semibold">Status: </span>
            <span>${task.status}</span>
        </div>
        <div class="flex gap-2">
            <span class="font-semibold">Priority: </span>
            <span>${task.priority}</span>
        </div>
        <div class="flex gap-2">
            <span class="font-semibold">Deadline: </span>
            <span>${task.deadline}</span>
        </div>
    `
        return li;
    })

    list!.replaceChildren(...tasksElements)
}

const getTasksList = async () => {
    try {
        const data = await getAllTasks();
        displayTasks(data)
    } catch (error) {
        console.log("Error getting tasks list")
    }
}


const onSubmit = async (data: Task): Promise<void> => {
    try {
        await addTask(data)
        await getTasksList()
    } catch (error) {
        console.log("Error creating task")
    }

}

const form = document.querySelector<HTMLFormElement>('#form')!

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const task = Object.fromEntries(formData.entries()) as unknown as Omit<Task, "id" | "createdAt"> ;

    onSubmit({
        ...task,
        id: nanoid(),
        createdAt: new Date()
    })

    form.reset()
})

getTasksList();

