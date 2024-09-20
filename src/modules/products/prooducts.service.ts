import { Inject, Injectable } from '@nestjs/common';
import { ProductDTO } from './entities/ProductDTO';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsServices {
  constructor(private productsRepository: ProductsRepository, private readonly categoriesService: CategoriesService) {}
  
  async getAll() {
    return await this.productsRepository.getAll()
  }

  async getById(id: string) {
    return await this.productsRepository.getById(id)
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
}
