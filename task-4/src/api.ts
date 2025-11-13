import type { Task, TaskDTO } from './types';
import { nanoid } from 'nanoid';

export const getAllTasks = async (): Promise<Task[]> => {
    const response = await fetch("http://localhost:3000/tasks")
    return await response.json()
}

export const getTaskById = async (id: string): Promise<Task> => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`)
    return await response.json()
}

export const addTask = async (newTask: TaskDTO): Promise<void> => {
   await fetch("http://localhost:3000/tasks", {
       method: "POST",
       body: JSON.stringify({
           newTask,
           id: nanoid(),
           createdAt: new Date()
       })
   })
}

export const updateTask = async (id: string, newTaskData: Partial<TaskDTO>): Promise<void> => {
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