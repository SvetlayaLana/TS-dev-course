import { Post } from '../models/post.model';

export const addPost = async (data: Partial<Post>) => {
  return await Post.create(data)
}

export const getPosts = async () => {
  return await Post.findAll()
}