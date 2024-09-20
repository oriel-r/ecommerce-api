import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { Repository } from "typeorm";
import { categoriesMock } from "./categories.mock";

@Injectable()
export class CategoriesSeeder {
    constructor(@InjectRepository(Category) private categoriesDbRepository: Repository<Category>) {}

    async seed () {
        const categories = await this.categoriesDbRepository.find()
        try {
            if(!categories.length) {
                for(const category of categoriesMock) {
                    const nCategory = await this.categoriesDbRepository.create(category)
                    await this.categoriesDbRepository.save(nCategory)
                }
                return console.log('The seed for categories is planted by CategoriesSeeder')
            } else return console.log('Database have data for categories')
        } catch(error) {
        console.log(error)
    }
  }
}