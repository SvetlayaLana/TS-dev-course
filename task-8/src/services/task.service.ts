import { NotFoundError } from '../error';
import { TaskDTO, TaskFilters } from '../types/task.types';
import { Task } from "../models/Task.model"
import { startOfDay } from 'date-fns';

export const getTasks = async (params: TaskFilters)=> {
  const filters = {};

  if (params.status) {
    Object.assign(filters, { status: params.status });
  }

  if (params.priority) {
    Object.assign(filters, { priority: params.priority });
  }

  if (params.createdAt) {
    Object.assign(filters, { createdAt: params.createdAt });
  }

  return await Task.findAll({
    where: filters
  });
}

export const getTaskDetails = async (id: number) => {
  const task = await Task.findByPk(id);

  if (!task) {
    throw new NotFoundError("Task");
  }

  return task;
}

export const addTask = async (task: TaskDTO) => {
  return await Task.create({
    ...task,
    deadline: startOfDay(new Date(task.deadline))
  });
}

export const updateTask = async (id: number, newTaskData: Partial<TaskDTO>) => {
  const task = await Task.findByPk(id)

  if (!task) {
    throw new NotFoundError("Task");
  }

  await task.update(newTaskData);
  return task
}

export const deleteTask = async (id: number)=> {
  const task = await Task.findByPk(id);

  if (!task) {
    throw new NotFoundError("Task");
  }

  await task.destroy()
}