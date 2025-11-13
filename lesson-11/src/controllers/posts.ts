import { NextFunction, Request, Response } from 'express';
import { addPost, getPosts } from '../service/posts';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await addPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error)
  }
}

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    next(error)
  }
}