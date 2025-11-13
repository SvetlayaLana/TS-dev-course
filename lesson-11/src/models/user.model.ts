import { AllowNull, Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Post } from './post.model';

@Table({ tableName: "users" })
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

  @HasMany(() => Post)
  posts!: Post[];
}