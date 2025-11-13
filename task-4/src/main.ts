import './style.css'
import { addTask, getAllTasks } from "./api"
import { type Task, type TaskDTO } from './types';
import { isBefore, startOfDay } from 'date-fns';

const showErrorMessage = (id: string, message: string) => {
    const errorBlock = document.querySelector<HTMLParagraphElement>(`#${id}`)!;
    errorBlock.className = errorBlock.className.replace("hidden", "block")
    errorBlock.innerHTML = message
}

const validate = (task: TaskDTO): boolean => {
    hideErrorMessage("title-error")
    hideErrorMessage("deadline-error")

    if (!task.title) {
        showErrorMessage("title-error", "Title is required");
        return false;
    }
    if (!task.deadline) {
        showErrorMessage("deadline-error", "Deadline is required");
        return false;
    }
    if (isBefore(startOfDay(new Date(task.deadline)), startOfDay(new Date()))) {
        showErrorMessage("deadline-error", "Deadline should not be in the past");
        return false;
    }

    return true;
}

const hideErrorMessage = (id: string) => {
    const errorBlock = document.querySelector<HTMLParagraphElement>(`#${id}`)!;
    errorBlock.innerHTML = ""
    errorBlock.className = errorBlock.className.replace("block", "hidden")
}

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
        hideErrorMessage("error")

        const data = await getAllTasks();
        displayTasks(data)
    } catch (error) {
        showErrorMessage("error", "Error getting tasks list")
    }
}


const onSubmit = async (data: TaskDTO): Promise<void> => {
    await addTask(data)
    await getTasksList()
}

const form = document.querySelector<HTMLFormElement>('#form')!

form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        hideErrorMessage("form-error")

        const formData = new FormData(form);
        const task = Object.fromEntries(formData.entries()) as TaskDTO;
        const isValid = validate(task);

        if (!isValid) return

        await onSubmit(task)

        form.reset()
    } catch (error) {
        showErrorMessage("form-error", "Error creating task")
    }
})

getTasksList();

