import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users') // エンドポイントのカテゴリを指定
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'すべてのユーザーを取得' })
  @ApiResponse({ status: 200, description: 'ユーザーのリストを返します。' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '指定したIDのユーザーを取得' })
  @ApiResponse({ status: 200, description: '指定したIDのユーザーを返します。' })
  @ApiParam({ name: 'id', description: 'ユーザーID' })
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '新しいユーザーを作成' })
  @ApiResponse({ status: 201, description: '新しいユーザーが作成されました。' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '指定したIDのユーザーを更新' })
  @ApiResponse({ status: 200, description: 'ユーザーが正常に更新されました。' })
  @ApiParam({ name: 'id', description: '更新するユーザーのID' })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '指定したIDのユーザーを削除' })
  @ApiResponse({ status: 200, description: 'ユーザーが正常に削除されました。' })
  @ApiParam({ name: 'id', description: '削除するユーザーのID' })
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
