
export class CreateTaskDto{
    id: number;
    title:string;
    description:string;
    duedate:Date;
    status:string;
    user_id:number;
    category_id:number;
  }