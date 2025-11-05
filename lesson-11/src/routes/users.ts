import { NextFunction, Router, Request, Response } from 'express';
import { z } from 'zod';
import { createUser, getAllUsers } from '../controllers/users';
import AppError from '../error';

const router = Router();

const queryParamSchema = z.object({
  name: z.string().min(2),
  age: z.string(),
})

function validateQueryParams(req: Request, res: Response, next: NextFunction) {
  console.log("Validating query params...", req.query);
  try {
    queryParamSchema.parse(req.query);
    next()
  } catch (error) {
    next(new AppError("Invalid query params", 400));
  }
}

router.use((req, res, next) => {
  console.log(`Users route middleware: ${req.method} ${req.url}`);
  next();
})

router.get('/', validateQueryParams, getAllUsers)

router.post('/', createUser)

export default router;