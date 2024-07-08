import { Controller, Get, Post, Patch, Param, Body, Delete} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from 'src/dto/category-dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/category-dto/update-category.dto';

@Controller('/category')
export class CategoryController {
  constructor(private readonly Categoryservice: CategoryService) {}

  @Get()
  getAllCategorys() {
    return this.Categoryservice.getAllCategorys();
  }

  @Post()
  addNewCategory(@Body() data: CreateCategoryDto) {
    return this.Categoryservice.addNewCategory(data);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.Categoryservice.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.Categoryservice.deleteCategory(id);
  }
}
