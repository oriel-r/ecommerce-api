import { Product } from "src/modules/products/entities/product.entity"
import { Order } from "../../orders/entities/order.entity"

export class OrderDetailDTO {
    order: Order
    products: Product[]
}