import { Expose } from "class-transformer"
import { IsArray, IsDate, IsNotEmpty, IsObject, IsString } from "class-validator"
import { ProductDTO } from "src/modules/products/entities/ProductDTO"
import { User } from "src/modules/users/entities/user.entity"
import { DeepPartial } from "typeorm"

export class OrderDto {
    @IsObject()
    @IsNotEmpty()
    @Expose({name: "user_id"})
    userId: User

    @IsNotEmpty()
    @IsDate()
    date: Date

    constructor(partial: DeepPartial<OrderDto>) {
        Object.assign(this, partial)
    }
}
