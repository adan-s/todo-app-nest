import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from "@nestjs/common";
import { CreateCategoryDto } from "./dto";
  
  let CATEGORY = [];
  
  @Controller("/category")
  export class CATEGORYController {
    @Post()
    createCategory(@Body() CreateCategoryDto: CreateCategoryDto) {
      CATEGORY.push(CreateCategoryDto);
      return { message: "Category added" };
    }
  
    @Get()
    findAllCATEGORY() {
      return CATEGORY;
    }
  
    @Get(":id")
    findCategoryById(@Param("id") id: number) {
      const Category = CATEGORY.find((Category) => Category.id === +id);
  
      if (!Category) {
        return { message: "Category not found" };
      }
  
      return Category;
    }
  
    @Put(":id")
    updateCategory(@Param("id") id: number, @Body() updateCategoryDto: CreateCategoryDto) {
      const CategoryIdx = CATEGORY.findIndex((Category) => Category.id === +id);
  
      if (!CategoryIdx) {
        return { message: "Category not found" };
      }
  
      CATEGORY[CategoryIdx] = updateCategoryDto;
  
      return { message: "Category updated" };
    }
  
    @Delete(":id")
    deleteCategory(@Param("id") id: number) {
      CATEGORY = CATEGORY.filter((Category) => Category.id !== +id);
  
      return { message: "Category deleted" };
    }
  }
  