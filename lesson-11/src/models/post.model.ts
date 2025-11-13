import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'posts' })
export class Post extends Model {
  @Column(DataType.STRING)
  text!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number
}