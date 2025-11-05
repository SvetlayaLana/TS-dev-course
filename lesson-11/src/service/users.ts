import { User } from '../types/users';
import crypto from 'crypto';

const users = [
  { id: "1", name: "Lana" },
  { id: "2", name: "Steve" },
  { id: "3", name: "Bob" },
]

export const getUsers = () => {
  return users;
}

export const addUser = (user: User) => {
  const id = crypto.randomUUID();
  users.push({ ...user, id });
  return user
}