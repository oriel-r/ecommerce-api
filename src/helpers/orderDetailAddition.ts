import { Product } from "src/modules/products/entities/product.entity"

export const addtionProducts = (data:Product[]) => {
    let total:number = 0
    for(const product of data) {
        total += Number(product.price)
    }
    return total
}