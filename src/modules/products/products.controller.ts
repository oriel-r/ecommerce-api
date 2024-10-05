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
  UseInterceptors,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { ProductsServices } from './prooducts.service';
import { ProductDTO } from './entities/product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/pipes/file-pipe/file-pipe.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
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

  @Get(':id/image')
  @HttpCode(HttpStatus.OK)
  async getProductImage(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsServices.getProductImage(id)
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createProduct(@Body() data: ProductDTO) {
    return await this.productsServices.createProduct(data);
  }

  @Post(":id/upload")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new FileValidationPipe(0,200, [ 'image/jpeg', 'image/png', 'image/webp'] ))
  async addPorductImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(id, file)
    return this.productsServices.addProductImage(id, file)
  }

  
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() data: ProductDTO) {
    return await this.productsServices.updateProduct(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string) {
    return await this.productsServices.deleteProduct(id);
  } 
}
