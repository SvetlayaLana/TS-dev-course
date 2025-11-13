import { Model, Table, Column, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import { Task } from './Task.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      isEmail: true
    }
  })
  email!: string;

  @HasMany(() => Task)
  tasks!: Task[];
}