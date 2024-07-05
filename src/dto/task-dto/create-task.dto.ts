import { IsNotEmpty } from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    duedate:Date;

    @IsNotEmpty()
    status:string;

    @IsNotEmpty()
    user_id:number;

    @IsNotEmpty()
    category_id:number;
  }