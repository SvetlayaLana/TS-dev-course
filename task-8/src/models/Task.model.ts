import { Model, Table, Column, AllowNull, DataType, ForeignKey } from 'sequelize-typescript';
import { Priority, Status } from '../types/task.types';
import { User } from './User.model';

@Table({ tableName: "tasks" })
export class Task extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(Status)))
  status!: Status

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(Priority)))
  priority!: Priority

  @Column({
    type: DataType.DATE,
    validate: {
      isDate: true
    }
  })
  deadline!: Date

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number
}