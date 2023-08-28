import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty()
  task_title: string;

  @ApiProperty()
  task_content?: string;

  @ApiProperty()
  user_id: number;
}
