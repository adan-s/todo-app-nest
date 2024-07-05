import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TasksController } from "./tasks.controller";

@Module({
  controllers: [UsersController,TasksController],
})
export class AppModule {}
