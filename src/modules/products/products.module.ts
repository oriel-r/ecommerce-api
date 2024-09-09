import { Module } from "@nestjs/common";
import { ProductsServies } from "./prooducts.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";

@Module({
    providers: [ProductsServies, ProductsRepository],
    controllers: [ProductsController]
})
export class ProductsModule {}