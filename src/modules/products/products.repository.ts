import { Injectable } from '@nestjs/common';
import { ProductDTO } from './entities/ProductDTO';
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
    const product = await this.productRepository.findOneBy({id: id})
    return product
  }
  
  async getImage(id: string) {
    const product = await this.productRepository.findOneBy({id:id})
    return product.imgUrl
  }

  async createProduct(data): Promise<Product[]>{
    const product = await this.productRepository.create(data)
    await this.productRepository.save(product)
    return product
  }

  async updateProduct(id: string, data: ProductDTO) {
    const product = await this.productRepository.findOneBy({id: id})
    product.name = data.name
    product.description = data.description
    product.price = data.price
    product.stock = data.stock
    product.imgUrl = data.imgUrl
    await this.productRepository.save(product)
    return product
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

