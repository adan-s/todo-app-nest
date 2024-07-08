import { Controller, Get, Post, Patch, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user-dto/create-user.dto';
import { UpdateUserDto } from 'src/user/user-dto/update-user.dto';
import { UserService } from './user.service';

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
