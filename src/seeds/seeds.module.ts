import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { SeedsService } from "./seeds.qr.service";
import { ProducstSeeder } from "./products/products.seeder";
import { CategoriesSeeder } from "./categories/categories.seeder";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product, ])],
    providers: [ProducstSeeder, CategoriesSeeder, SeedsService],
    exports: [ProducstSeeder, CategoriesSeeder]
})
export class SeedsModule {}