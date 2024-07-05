import { IsOptional } from "class-validator";

export class CreateTaskDto{
    @IsOptional()
    title:string

    @IsOptional()
    description:string;

    @IsOptional()
    duedate:Date;

    @IsOptional()
    status:string;

    @IsOptional()
    user_id:number;

    @IsOptional()
    category_id:number;
  }