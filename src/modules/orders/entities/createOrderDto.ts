import { Expose } from "class-transformer"
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator"
import { ProductDTO } from "src/modules/products/entities/ProductDTO"
import { DeepPartial } from "typeorm"

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @Expose({name: "user_id"})
    @IsUUID()
    userId: string

    @IsArray()
    @IsNotEmpty()
    products: DeepPartial <ProductDTO[]>

    constructor(partial: DeepPartial<CreateOrderDto>) {
        Object.assign(this, partial)
    }
}
