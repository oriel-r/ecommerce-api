import { Product } from "src/modules/products/entities/product.entity"
import { Order } from "../../orders/entities/order.entity"
import { IsArray, IsNotEmpty, IsObject } from "class-validator"

export class OrderDetailDTO {
    @IsNotEmpty()
    @IsObject()
    order: Order
    
    @IsNotEmpty()
    @IsArray()
    products: Product[]
}