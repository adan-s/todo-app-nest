import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/user-dto/create-user.dto';
import { UpdateUserDto } from '../dto/user-dto/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  addNewUser(@Body() data: CreateUserDto) {
    return this.userService.addNewUser(data);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
