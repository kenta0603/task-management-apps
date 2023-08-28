import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ユーザーの一意のID' }) // Swaggerの説明を追加
  id: string;

  @Column()
  @ApiProperty({ description: 'ユーザーの名前' }) // Swaggerの説明を追加
  user_name: string;

  @OneToMany(() => Task, (task) => task.user)
  @ApiProperty({
    type: () => [Task],
    description: 'ユーザーに関連するタスクのリスト',
  }) // Swaggerの説明と型を追加
  tasks: Task[];
}
