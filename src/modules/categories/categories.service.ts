import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './entities/CategoryDto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoriesDbRepository: Repository<Category>) {}

  async getCategories() {
    const categories = await this.categoriesDbRepository.find();
    return categories
  }

  async addCategory(categoryData: CategoryDTO) {
    const category = await this.categoriesDbRepository.create(categoryData)
    await this.categoriesDbRepository.save(category)
    return category
  }

  async getCategoryByid(id: string) {
    const category = await this.categoriesDbRepository.findOneBy({id: id})
    if(!category) throw new NotFoundException
    return category
  }
}
