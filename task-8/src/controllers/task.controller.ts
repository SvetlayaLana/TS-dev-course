import { NextFunction, Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getTasks(req.query);
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.getTaskDetails(Number(req.params.id));
    res.json(task)
  } catch (error) {
    next(error)
  }
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTask = await taskService.addTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedTask = await taskService.updateTask(Number(req.params.id), req.body);
    res.json(updatedTask)
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(Number(req.params.id));
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    return next(error)
  }
}