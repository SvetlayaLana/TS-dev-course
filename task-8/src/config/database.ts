import { Sequelize } from 'sequelize-typescript';
import { Task } from "../models/Task.model"
import { User } from '../models/User.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: "db_task-8",
  username: "postgres",
  password: "admin",
  models: [Task, User]
})

sequelize.authenticate().then(() => {
  console.log("Database connection established successfully.");
})

sequelize.sync({ alter: true }).then(() => {
  console.log("All models are synchronized successfully")
})

export default sequelize;