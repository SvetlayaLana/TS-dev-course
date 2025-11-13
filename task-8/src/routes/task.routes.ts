import { Router, Request, Response, NextFunction } from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/task.controller';
import { z } from 'zod';
import { Priority, Status } from '../types/task.types';
import { isAfter, isValid, startOfDay } from 'date-fns';
import AppError from '../error';

const router = Router();

const queryParamsSchema = z.object({
  status: z.enum(Status, "Status should be one of the following: todo, in_progress, done").optional(),
  priority: z.enum(Priority, "Priority should be one of the following: low, medium, high").optional(),
  createdAt: z.string().optional().refine(val => val ? isValid(new Date(val)) : true, "Date has incorrect format")
})

const requestBodySchema = z.object({
  title: z.string("Title is required").min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(Status, "Status should be one of the following: todo, in_progress, done"),
  priority: z.enum(Priority, "Priority should be one of the following: low, medium, high"),
  deadline: z.string("Deadline is required").refine(val => isValid(new Date(val))
    && !isAfter(startOfDay(new Date()), startOfDay(new Date(val))), "Deadline should be valid date and not in the past")
})

function validateQueryParams(req: Request, res: Response, next: NextFunction) {
  try {
    queryParamsSchema.parse(req.query);
    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0]?.message || "", 400));
    }
  }
}

function validateRequestBody(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = req.method === "POST" ? requestBodySchema : requestBodySchema.partial();
    schema.parse(req.body);
    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0]?.message || "", 400));
    }
  }
}

router.get('/', validateQueryParams, getAllTasks)
router.get('/:id', getTaskById)
router.post('/', validateRequestBody, createTask)
router.put('/:id', validateRequestBody, updateTask)
router.delete('/:id', deleteTask)

export default router;