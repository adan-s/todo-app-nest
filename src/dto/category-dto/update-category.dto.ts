import { IsOptional } from "class-validator";

export class UpdateCategoryDto{
    @IsOptional()
    category_name:string;

    @IsOptional()
    user_id:number;
}