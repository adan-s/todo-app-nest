import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto{
    @IsNotEmpty()
    category_name:string;

    @IsNotEmpty()
    user_id:number;
}