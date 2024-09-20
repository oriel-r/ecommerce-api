import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/modules/products/entities/product.entity";
import { Repository } from "typeorm";
import { productsMock } from "./products.mock";
import { Category } from "src/modules/categories/entities/category.entity";

@Injectable()
export class ProducstSeeder {
    constructor(
        @InjectRepository(Product) private productDbRepository: Repository<Product>,
        @InjectRepository(Category) private categoriesDbRepository: Repository<Category>
    ) {}

    async seed() {
        const products = await this.productDbRepository.find()
        try {
            if(!products.length) {
                for(const product of productsMock) {
                    
                    const category = await this.categoriesDbRepository.findOne({where:{name: product.category_id}})
                    const nProduct = await this.productDbRepository.create({...product, category: category})
                    await this.productDbRepository.save(nProduct)
                }
    
                return console.log('Seed for products is planted by ProductsSeeder')
                
            } else {
                return console.log('the database have data for products')
            }
        } catch(error) {
            console.log(error)
        }
    }
}