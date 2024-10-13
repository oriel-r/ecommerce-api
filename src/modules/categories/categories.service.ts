import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './entities/category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories() {
    const categories = await this.categoriesRepository.findAllCategories();
    if (!categories) throw new NotFoundException('Not found categories or have problems with database')
    return categories
  }

  async addCategory(categoryData: CategoryDTO) {
    const category = await this.categoriesRepository.getCategoryByName(categoryData.name)
    if (category) throw new ConflictException('category already exists')
    return await this.categoriesRepository.addCategory(categoryData)
  }

  async getCategoryByid(id: string) {
    const category = await this.categoriesRepository.getCategoryById(id)
    if(!category) throw new NotFoundException()
    return category
  }
}
