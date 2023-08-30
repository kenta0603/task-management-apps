import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'すべてのタスクを取得' })
  @ApiResponse({ status: 200, description: 'タスクのリストを返します。' })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '指定したIDのタスクを取得' })
  @ApiResponse({ status: 200, description: '指定したIDのタスクを返します。' })
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '新しいタスクを作成' })
  @ApiResponse({ status: 201, description: '新しいタスクが作成されました。' })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '指定したIDのタスクを更新' })
  @ApiResponse({ status: 200, description: 'タスクが正常に更新されました。' })
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '指定したIDのタスクを削除' })
  @ApiResponse({ status: 200, description: 'タスクが正常に削除されました。' })
  remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
