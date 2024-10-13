import { BadGatewayException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductDTO } from './entities/product.dto';
import { ProductsRepository } from './products.repository';
import { CategoriesService } from '../categories/categories.service';
import { FileUploadService } from '../file-upload/file-upload.service';
import { Product } from './entities/product.entity';
import { isEqual } from 'src/helpers/is-equial';

@Injectable()
export class ProductsServices {
  constructor(
    private productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService,
    private readonly fileUploadService: FileUploadService
  ) {}
  
  async getAll(): Promise<Product[]> {
    const products = await this.productsRepository.getAll()
    if(!products.length) throw new NotFoundException("Don't exist products or have a problem in database")
    return products
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productsRepository.getById(id)
    if(!product) throw new NotFoundException('This product not exist')
    return product
  }

  async getProductImage(id: string): Promise<string> {
    return await this.productsRepository.getImage(id)
  }
  
  async createProduct(data:ProductDTO): Promise<Product> {
    const category = await this.categoriesService.getCategoryByid(data.category_id)
    const product = await this.productsRepository.createProduct({...data, category:category})
    return product[0]
  }

  async updateProduct(id: string, data: ProductDTO) {
    const product = await this.productsRepository.getById(id)
    if(!product) throw new NotFoundException('Product not found')
    if(isEqual(data, product)) return new HttpException('The content is equal', HttpStatus.NO_CONTENT)
    const result = await this.productsRepository.updateProduct(id, data)
    return {message: 'Duccessfully updated', result}
  }

  async deleteProduct(id:string) {
    const product = await this.productsRepository.getById(id)
    if(!product) throw new NotFoundException('Product not found')
    return await this.productsRepository.deleteProduct(id)
  }

  async getProductsList(data) {
    return await this.productsRepository.createProductListByOrder(data)
  }

  async rollbackBuy(data) {
    return await this.productsRepository.rollbackCreateProductsList(data)
  }

 async addProductImage(id: string, file) {
    const product = await this.productsRepository.getById(id)
    if(!product) throw new NotFoundException('Product not found or wrong uuid')
    const imgUrl = await this.fileUploadService.uploadFile({
      fieldname: file.fieldname,
      mimetype: file.mimetype,
      originalname: file.originalname,
      buffer: file.buffer,
      size: file.size
    })
    if (imgUrl){
      await this.productsRepository.updateImage(id, imgUrl)
      return imgUrl
    }
  }
}
