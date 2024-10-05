import { Inject, Injectable } from '@nestjs/common';
import { ProductDTO } from './entities/product.dto';
import { ProductsRepository } from './products.repository';
import { CategoriesService } from '../categories/categories.service';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class ProductsServices {
  constructor(
    private productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService,
    private readonly fileUploadService: FileUploadService
  ) {}
  
  async getAll() {
    return await this.productsRepository.getAll()
  }

  async getById(id: string) {
    return await this.productsRepository.getById(id)
  }

  async getProductImage(id: string) {
    return await this.productsRepository.getImage(id)
  }
  
  async createProduct(data:ProductDTO) {
    const category = await this.categoriesService.getCategoryByid(data.category_id)
    return await this.productsRepository.createProduct({...data, category:category})
  }

  async updateProduct(id: string, data: ProductDTO) {
    return await this.productsRepository.updateProduct(id, data)
  }

  async deleteProduct(id:string) {
    return await this.productsRepository.deleteProduct(id)
  }

  async getProductsList(data) {
    return await this.productsRepository.createProductListByOrder(data)
  }

  async rollbackBuy(data) {
    return await this.productsRepository.rollbackCreateProductsList(data)
  }

 async addProductImage(id: string, file) {
     console.log(id)
    console.log(file)
    const imgUrl = await this.fileUploadService.uploadFile({
      fieldname: file.fieldname,
      mimetype: file.mimetype,
      originalname: file.originalname,
      buffer: file.buffer,
      size: file.size
    })
    console.log(imgUrl)
    if (imgUrl) {
      await this.productsRepository.updateImage(id, imgUrl)
      return imgUrl
    }
  }
}
