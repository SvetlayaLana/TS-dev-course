import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "db_development",
  username: "postgres",
  password: "admin",
  models: [User, Post],
})

sequelize.authenticate().then(() => {
  console.log("Database connection established successfully.")
})

sequelize.sync({ alter: true }).then(() => {
  console.log("All models are synchronized successfully")
})

export default sequelize;