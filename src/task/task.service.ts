import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dto/task-dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/task-dto/update-task.dto';
import { Task } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) {}

  async getAllTasks() {
    return await this.repo.find();
  }

  async addNewTask(createTaskDto: CreateTaskDto) {
    try {
      const newTask = this.repo.create(createTaskDto);
      return await this.repo.save(newTask);
    } catch (error) {
      console.error('Error saving Task:', error);
      throw new Error('Could not save Task');
    }
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    await this.repo.update(id, updateTaskDto);
    return this.repo.findOneBy({ id });
  }

  async deleteTask(id: number,) {
    return await this.repo.delete(id);
  }
}