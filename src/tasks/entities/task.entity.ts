import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity() // このデコレータは、このクラスがTypeORMエンティティとして使用されることを示します。
export class Task {
  @PrimaryGeneratedColumn() // このカラムは主キーであり、自動的に増分されるIDを持っています。
  id: number;

  @Column() // 通常のカラムを示すデコレータ。
  task_title: string;

  @Column()
  task_content: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.tasks) // 多対1のリレーションシップ。各タスクは1人のユーザーに関連付けられます。
  @JoinColumn({ name: 'user_id' }) // このデコレータは、外部キーとして使用されるカラムを指定します。
  user: User;
}
