import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('指定のユーザーは見つかりませんでした');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.user_name = createUserDto.user_name;
    // ... 他のプロパティも同様に設定 ...

    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(id); // 既存のユーザーを取得
    user.user_name = updateUserDto.user_name || user.user_name;
    // ... 他のプロパティも同様に更新 ...

    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id); // 削除する前にユーザーが存在するか確認
    await this.userRepository.remove(user);
  }
}
