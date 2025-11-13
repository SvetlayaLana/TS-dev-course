import express, { Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import cors from "cors";
import taskRoutes from './routes/task.routes';
import AppError from './error';
import "./config/database"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

app.use("/tasks", taskRoutes)

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log("Error: ", err.message);
  res.status(err.statusCode || 500).json({ error: err.message || "Something went wrong" });
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})
