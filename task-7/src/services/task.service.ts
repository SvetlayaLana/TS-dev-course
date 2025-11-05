import crypto from 'crypto';
import AppError, { NotFoundError } from '../error';
import { Priority, Status, Task, TaskDTO, TaskFilters } from '../types/task.types';
import { isSameDay } from 'date-fns';

const tasks: Task[] = [
  {
    "id": "0",
    "title": "Look at the window",
    "description": "Go to window and look",
    "createdAt": "2025-10-05",
    "status": Status.DONE,
    "priority": Priority.HIGH,
    "deadline": "2025-10-07"
  },
  {
    "id": "1",
    "title": "Eat sandwich",
    "description": "Just eat",
    "createdAt": "2025-10-06",
    "status": Status.DONE,
    "priority": Priority.LOW,
    "deadline": "2025-10-22"
  },
  {
    "id": "2",
    "title": "Pet the cat",
    "description": "You know what to do",
    "createdAt": "2025-10-07",
    "status": Status.DONE,
    "priority": Priority.LOW,
    "deadline": "2025-10-11"
  },
  {
    "id": "3",
    "title": "Check out memes",
    "createdAt": "2025-10-07",
    "status": Status.DONE,
    "priority": Priority.MEDIUM,
    "deadline": "2025-10-09"
  },
  {
    "id": "4",
    "title": "Call mom",
    "createdAt": "2025-10-06",
    "status": Status.TODO,
    "priority": Priority.LOW,
    "deadline": "2025-10-07"
  },
  {
    "id": "5",
    "title": "Go for a walk",
    "description": "Wear your warm sweater and go to the park",
    "createdAt": "2025-10-05",
    "status": Status.DONE,
    "priority": Priority.LOW,
    "deadline": "2025-10-09"
  },
  {
    "id": "6",
    "title": "Cook the diner",
    "createdAt": "2025-10-06",
    "status": Status.IN_PROGRESS,
    "priority": Priority.LOW,
    "deadline": "2025-10-07"
  },
  {
    "id": "7",
    "title": "Read the book",
    "createdAt": "2025-10-07",
    "status": Status.DONE,
    "priority": Priority.HIGH,
    "deadline": "2025-10-30"
  }
]

export const getTasks = (filters: TaskFilters)=> {
  if (!Object.keys(filters).length) {
    return tasks
  }

  return tasks.filter(task =>  {
    let condition = true;

    if ("status" in filters) {
      condition = condition && task.status === filters.status;
    }

    if ("priority" in filters) {
      condition = condition && task.priority === filters.priority;
    }

    if ("createdAt" in filters) {
      condition = condition && isSameDay(new Date(task.createdAt), new Date(filters.createdAt!));
    }

    return condition
  })
}

export const getTaskDetails = (id: string): Task | undefined => {
  return tasks.find(item => item.id === id)
}

export const addTask = (task: TaskDTO): Task => {
  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date()
  }

  tasks.push(newTask);

  return newTask
}

export const updateTask = (id: string, newTaskData: TaskDTO): Task => {
  const taskToUpdateIdx = tasks.findIndex(item => item.id === id);

  if (taskToUpdateIdx === -1) {
    throw new NotFoundError("Task");
  }

  const oldTask = tasks[taskToUpdateIdx];
  const updatedTask = {
    ...oldTask!,
    ...newTaskData,
  };

  tasks.splice(taskToUpdateIdx, 1, updatedTask)

  return updatedTask
}

export const deleteTask = (id: string)=> {
  const taskIdx = tasks.findIndex(task => task.id === id);

  if (taskIdx === -1) {
    throw new NotFoundError("Task");
  } else {
    tasks.splice(taskIdx, 1);
  }
}