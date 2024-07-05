import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from "@nestjs/common";
  import { CreateTaskDto } from "./dto";
  
  let TASKS = [];
  
  @Controller("/TASKS")
  export class TasksController {
    @Post()
    createtask(@Body() CreateTaskDto: CreateTaskDto) {
      TASKS.push(CreateTaskDto);
      return { message: "Task added" };
    }
  
    @Get()
    findAllTASKS() {
      return TASKS;
    }
  
    @Get(":id")
    findtaskById(@Param("id") id: number) {
      const task = TASKS.find((task) => task.id === +id);
  
      if (!task) {
        return { message: "Task not found" };
      }
  
      return task;
    }
  
    @Put(":id")
    updatetask(@Param("id") id: number, @Body() updateTaskDto: CreateTaskDto) {
      const taskIdx = TASKS.findIndex((task) => task.id === +id);
  
      if (!taskIdx) {
        return { message: "Task not found" };
      }
  
      TASKS[taskIdx] = updateTaskDto;
  
      return { message: "Task updated" };
    }
  
    @Delete(":id")
    deletetask(@Param("id") id: number) {
      TASKS = TASKS.filter((task) => task.id !== +id);
  
      return { message: "Task deleted" };
    }
  }
  