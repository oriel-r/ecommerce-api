import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './entities/category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '../products/entities/product.entity';
import { Category } from './entities/category.entity';

@ApiTags('Categories-v2')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all categories'
  })
  @ApiResponse({
    status: 200,
    example: ['Categories array']
  })
  @ApiResponse({
    status: 404,
    example: {
      message: 'Not found categories or have database problem'
    }
  })
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiOperation({
    summary: 'Create a new category'
  })
  @ApiResponse({
    status: 201,
    example: {
      name: 'A category name',
      id: 'uuid',
    }
  })
  @ApiResponse({
    status:409,
    example: {message:'Category already exists'}
  })
  @Post()
  addCategory( @Body() categoryData: CategoryDTO) {
    return this.categoriesService.addCategory(categoryData);
  }
}
