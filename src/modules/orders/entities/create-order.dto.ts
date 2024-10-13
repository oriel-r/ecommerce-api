import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator"
import { ProductDTO } from "src/modules/products/entities/product.dto"
import { DeepPartial } from "typeorm"

export class CreateOrderDto {

    @ApiProperty({
        description: "user's id"
    })
    @IsString()
    @IsNotEmpty()
    @Expose({name: "user_id"})
    @IsUUID()
    userId: string

    @ApiProperty({
        description: "object array with product ids"
    })
    @IsArray()
    @IsNotEmpty()
    products: DeepPartial <ProductDTO[]>

    constructor(partial: DeepPartial<CreateOrderDto>) {
        Object.assign(this, partial)
    }
}
