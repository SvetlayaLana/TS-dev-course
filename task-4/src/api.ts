import type {Task} from "./types";

export const getAllTasks = async (): Promise<Task[]> => {
    const response = await fetch("http://localhost:3000/tasks")
    return await response.json()
}

export const getTaskById = async (id: string): Promise<Task> => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`)
    return await response.json()
}

export const addTask = async (newTask: Task): Promise<void> => {
   await fetch("http://localhost:3000/tasks", {
       method: "POST",
       body: JSON.stringify(newTask)
   })
}

export const updateTask = async (id: string, newTaskData: Partial<Omit<Task | "id", "createdAt">>): Promise<void> => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(newTaskData)
    })
}

export const removeTask = async (id: string): Promise<void> => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
    })
}