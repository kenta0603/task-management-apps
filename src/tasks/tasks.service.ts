import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.task_title = createTaskDto.task_title;
    task.task_content = createTaskDto.task_content;
    // ... 他のプロパティも同様に設定 ...

    return await this.taskRepository.save(task);
  }

  async update(id: string, updateTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.findOne(id); // 既存のタスクを取得
    task.task_title = updateTaskDto.task_title || task.task_title;
    task.task_content = updateTaskDto.task_content || task.task_content;
    // ... 他のプロパティも同様に更新 ...

    return await this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id); // 削除する前にタスクが存在するか確認
    await this.taskRepository.remove(task);
  }
}
