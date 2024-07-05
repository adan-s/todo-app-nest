import { IsOptional } from "class-validator";

export class CreateCategoryDto{
    @IsOptional()
    category_name:string;

    @IsOptional()
    user_id:number;
}