import { Product } from "src/modules/products/entities/product.entity"
import { Order } from "../../orders/entities/order.entity"
import { IsArray, IsNotEmpty, IsObject } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class OrderDetailDTO {
    @ApiProperty({
        description: 'This property is add in CreateOrde process'
    })
    @IsNotEmpty()
    @IsObject()
    order: Order
    
    @ApiProperty({
        description: 'Add in CreateOrder process from CreateOrderDTO'
    })
    @IsNotEmpty()
    @IsArray()
    products: Product[]
}