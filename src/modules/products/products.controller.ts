import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsServices } from './prooducts.service';
import { ProductDTO } from './entities/ProductDTO';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.productsServices.getAll();
  }
  
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsServices.getById(id);
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createProduct(@Body() data: ProductDTO) {
    return await this.productsServices.createProduct(data);
  }
  
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateProduct(@Param('id') id: string, @Body() data: ProductDTO) {
    return await this.productsServices.updateProduct(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string) {
    return await this.productsServices.deleteProduct(id);
  } 
}
