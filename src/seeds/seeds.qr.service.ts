import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository, TypeOrmDataSourceFactory, TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { connectionSource } from "src/config/data-source";

@Injectable()
export class SeedsService {
    async seed(productsMock, categoriesMock) {
        const queryRunner = await connectionSource.createQueryRunner()
        await queryRunner.connect()

        
    }
}