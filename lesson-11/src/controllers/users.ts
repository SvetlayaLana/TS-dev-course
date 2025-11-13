import { NextFunction, Request, Response } from 'express';
import { addUser, editUser, getUserById, getUsers, removeUser } from '../service/users';
import AppError from '../error';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsers(req.query)
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;

  try {
    if (!name) {
      throw new AppError("Name is required", 400);
    }

    const user = await addUser(req.body)
    res.status(201).json(user);
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await editUser(Number(req.params.id), req.body)
    res.json(user);
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await removeUser(Number(req.params.id))
    res.json({ message: 'User deleted successfully.' })
  } catch (error) {
    next(error)
  }
}

export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(Number(req.params.id))
    res.json(user)
  } catch (error) {
    next(error)
  }
}