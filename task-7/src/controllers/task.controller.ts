import { NextFunction, Request, Response } from 'express';
import * as taskService from '../services/task.service';
import AppError, { NotFoundError } from '../error';

export const getAllTasks = (req: Request, res: Response) => {
  const tasks = taskService.getTasks(req.query);
  res.json(tasks)
}

export const getTaskById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = taskService.getTaskDetails(req.params.id!);

    if (!task) {
      throw new AppError("Task not found", 400);
    }

    res.json(task)
  } catch (error) {
    next(error)
  }
}

export const createTask = (req: Request, res: Response) => {
  const newTask = taskService.addTask(req.body);
  res.status(201).json(newTask);
}

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedTask = taskService.updateTask(req.params.id!, req.body);
    res.json(updatedTask)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(new AppError(error.message, 404));
    }
    return next(error)
  }
}

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    taskService.deleteTask(req.params.id!);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(new AppError(error.message, 404));
    }
    return next(error)
  }
}