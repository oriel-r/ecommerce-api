import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDTO } from "./entities/ProductDTO";

@Injectable()
export class ProductsServies {
    constructor (private productsRepository: ProductsRepository) {}
    getAll() {
        return this.productsRepository.getAll()
    }
    getById(id:string) {
        return this.productsRepository.getById(id)
    }
    createProduct(data:ProductDTO) {
        return this.productsRepository.createProduct(data)
    }
    updateProduct(id:string, data:ProductDTO) {
        return this.productsRepository.updateProduct(id, data)
    }
    deleteProduct(id:string) {
        return this.productsRepository.deleteProduct(id)
    }
}