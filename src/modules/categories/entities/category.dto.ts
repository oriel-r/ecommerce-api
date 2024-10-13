import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Product } from "src/modules/products/entities/product.entity"

export class CategoryDTO {
    @ApiProperty({
        description: "category's name",
        example: 'headphones'
    })
    @IsString()
    @IsNotEmpty()
    name: string
    
    @ApiPropertyOptional({
        description: 'Is not needed to create a new category',
    })
    @IsOptional()
    @IsArray()
    product?: Product[]
}
