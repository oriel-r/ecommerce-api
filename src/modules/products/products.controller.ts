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
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { error } from 'console';
import { RoleGuard } from '../auth/role.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsServices) {}

  @Get()
  @ApiOperation({
    summary: 'Get all producs'
  })
  @ApiResponse({
    status: 200,
    example: ['{Product A}', '{Product B}', 'Other products'
    ]
  })
  @ApiResponse({
    status: 404,
    example: {
      status: 404,
      message: "Don't exist products or have a problem in database",
      error: 'Not found'
    }
  })
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.productsServices.getAll();
  }
  @ApiNotFoundResponse()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsServices.getById(id);
  }
  
  @Get(':id/image')
  @ApiOperation({
    summary: "Get product's image"
  })
  @ApiResponse({
    description: 'An image url of product'
  })
  @HttpCode(HttpStatus.OK)
  async getProductImage(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsServices.getProductImage(id)
  }
  
  @Post()
  @ApiOperation({
    summary: 'Add new product'
  })
  @ApiBearerAuth()
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
  @ApiOperation({
    summary: "Update product's data, send a request with new data only",
    description: 'Admin permissions required'
  })
  @ApiResponse({
    status: 200,
    example: {
      status:200,
      message: "successfully updated",
      UdapteResult: 'A new UpdateResult'
    }
  })
  @ApiResponse({
    example: {
      status: 204,
      message: 'The content is equal',
    }
  })
  @ApiResponse({
    example: {
      status: 404,
      message: 'Product not found',
      error: 'Not found'
    }
  })
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RoleGuard)
  async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() data: ProductDTO) {
    return await this.productsServices.updateProduct(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete a product'
  })
  @ApiResponse({
    example: {
      status: 404,
      message: 'Product not found',
      error: 'Not found'
    }
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string) {
    return await this.productsServices.deleteProduct(id);
  } 
}
