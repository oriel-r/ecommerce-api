import { Injectable } from '@nestjs/common';
import { ProductDTO } from './entities/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  async getAll() {
    return await this.productRepository.find({relations: {category:true}})
  }

  async getById(id: string) {
    return await this.productRepository.findOneBy({id})
  }
  
  async getImage(id: string) {
    const product = await this.productRepository.findOneBy({id})
    return product.imgUrl
  }

  async createProduct(data): Promise<Product[]>{
    return await this.productRepository.save(
      this.productRepository.create(data)
    )
  }

  async updateProduct(id: string, data: ProductDTO) {
    return await this.productRepository.update(id, data)
  }

  async deleteProduct(id:string) {
    return await this.productRepository.delete({id: id})
  }

  async createProductListByOrder(data: DeepPartial<Product[]>): Promise<Product[]> {
    const productsList: Product[] = []
    for(const item of data) {
      const product = await this.productRepository.findOneBy({id: item.id})
      if(product && product.stock > 0) {
        product.stock --
        await this.productRepository.save(product)
        productsList.push(product)
      }
    }
    return productsList
  }

  async rollbackCreateProductsList(data: DeepPartial<Product[]>) {
    for(const item of data) {
      const product = await this.productRepository.findOneBy({id: item.id})
      if(product) product.stock ++
    }
    return true
  }

  async updateImage(id: string, data): Promise<string> {
    await this.productRepository.update(id, {imgUrl: data })
    return data
  }

}

