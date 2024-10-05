import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './entities/category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  addCategory(categoryData: CategoryDTO) {
    return this.categoriesService.addCategory(categoryData);
  }
}
