import { NextFunction, Request, Response } from 'express';
import { addUser, getUsers } from '../service/users';
import AppError from '../error';

export const getAllUsers = (req: Request, res: Response) => {
  const users = getUsers()
  res.json(users)
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;

  try {
    if (!name) {
      throw new AppError("Name is required", 400);
    }

    const user = addUser(req.body)
    res.status(201).json(user);
  } catch (error) {
    next(error)
  }
}