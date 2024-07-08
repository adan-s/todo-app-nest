import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user-dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/user-dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from '../entities/create-user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private repo: Repository<Users>,
  ) {}

  async getAllUsers() {
    return await this.repo.find();
  }

  async addNewUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.repo.create(createUserDto);
      return await this.repo.save(newUser);
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Could not save user');
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.repo.update(id, updateUserDto);
    return this.repo.findOneBy({ id });
  }
}
