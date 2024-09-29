import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { SeedsService } from "./seeds.qr.service";
import { ProducstSeeder } from "./products/products.seeder";
import { CategoriesSeeder } from "./categories/categories.seeder";
import { User } from "src/modules/users/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";
import { UserSeeder } from "./user/user.seeder";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product, User ])],
    providers: [ProducstSeeder, CategoriesSeeder, SeedsService, UserSeeder],
    exports: [ProducstSeeder, CategoriesSeeder, UserSeeder]
})
export class SeedsModule {}