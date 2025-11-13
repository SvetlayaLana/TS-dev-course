import { User } from "../models/user.model"
import { FilterParams } from '../types/users';
import { Op } from 'sequelize';
import AppError from '../error';

export const getUsers = async (params: FilterParams) => {
  const filters = {}

  if (params.name) {
    Object.assign(filters, { name: params.name });
  }

  return await User.findAll({
    include: ["posts"],
    where: {
      [Op.and]: filters
    }
  });
}

export const addUser = async (data: Partial<User>) => {
  const user = await User.create(data);
  return user
}

export const editUser = async (id: number, data: Partial<User>) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await user.update(data);
  return user
}

export const removeUser = async (id: number) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await user.destroy()
}

export const getUserById = async (id: number) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user
}