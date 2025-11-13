import { NextFunction, Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getAllTasks = (req: Request, res: Response) => {
  const tasks = taskService.getTasks(req.query);
  res.json(tasks)
}

export const getTaskById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = taskService.getTaskDetails(req.params.id!);
    res.json(task)
  } catch (error) {
    next(error)
  }
}

export const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTask = taskService.addTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error)
  }
}

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedTask = taskService.updateTask(req.params.id!, req.body);
    res.json(updatedTask)
  } catch (error) {
    next(error)
  }
}

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    taskService.deleteTask(req.params.id!);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error)
  }
}