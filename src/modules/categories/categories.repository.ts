import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CategoryDTO } from "./entities/category.dto";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>
    ) {}

    async findAllCategories() {
        return await this.categoriesRepository.find()
    }

    async getCategoryById(id) {
        return await this.categoriesRepository.findOneBy({id})
    }

    async getCategoryByName(name) {
        return await this.categoriesRepository.findOneBy({name})
    }
    
    async addCategory(categoryData: CategoryDTO) {
        return await this.categoriesRepository.save(
            this.categoriesRepository.create(categoryData)
        )
    }
}