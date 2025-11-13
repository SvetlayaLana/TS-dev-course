import express, { NextFunction, Request, Response } from 'express';
import morgan from "morgan"
import cors from "cors"
import userRoutes from "./routes/users"
import postRoutes from "./routes/posts"
import AppError from './error';
import "./config/database"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use((req, res, next) => {
  console.log(`logging, ${req.method} ${req.url}`);
  next();
})

app.use((req, res, next) => {
  console.log(`Another middleware executed`);
  next()
});

app.get('/', (req, res) => {
  res.send("Hello, TypeScript with Express");
})

app.use("/users", userRoutes);
app.use("/posts", postRoutes)

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(err.statusCode || 500).send(err.message || "Something is broken");
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})