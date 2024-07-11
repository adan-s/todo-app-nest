import { Controller, Get, Post, Patch, Param, Body, Delete} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { UpdateTaskDto } from 'src/dto/task-dto/update-task.dto';
import { CreateTaskDto } from 'src/dto/task-dto/create-task.dto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly Taskservice: TaskService) {}

  @Get()
  getAllTasks() {
    return this.Taskservice.getAllTasks();
  }

  @Get('api/:user_id')
  getUserTasks(@Param('user_id') user_id: number) {
    return this.Taskservice.getUserTasks(user_id);
  }


  @Post()
  addNewTask(@Body() data: CreateTaskDto) {
    return this.Taskservice.addNewTask(data);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.Taskservice.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.Taskservice.deleteTask(id);
  }
}
