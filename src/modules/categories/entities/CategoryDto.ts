import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Product } from "src/modules/products/entities/product.entity"

export class CategoryDTO {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsOptional()
    @IsArray()
    product?: Product[]
}
