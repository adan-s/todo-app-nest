import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/category-dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/category-dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from '../entities/create-category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) {}

  async getAllCategorys() {
    return await this.repo.find();
  }

  async addNewCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = this.repo.create(createCategoryDto);
      return await this.repo.save(newCategory);
    } catch (error) {
      console.error('Error saving Category:', error);
      throw new Error('Could not save Category');
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.repo.update(id, updateCategoryDto);
    return this.repo.findOneBy({ id });
  }

  async deleteCategory(id: number,) {
    return await this.repo.delete(id);
  }
}
