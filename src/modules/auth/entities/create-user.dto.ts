import { IsEmail, IsNotEmpty, IsStrongPassword, IsString, IsOptional, Matches } from "class-validator"
import { Transform } from "class-transformer"
import { Order } from "src/modules/orders/entities/order.entity"
import { ApiBody, ApiProperty } from "@nestjs/swagger"

export class CreateUserDTO {

    @ApiProperty({
        description: 'The name of user',
        required: true,
        example: 'Carlos'
    })
    @IsNotEmpty()
    @IsString()
    name: string
    
    @ApiProperty({
        description: "The user's email addres, this email will be uses in the auth process",
        required: true,
        uniqueItems: true,
        example: 'carlos@email.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string
 
    @ApiProperty({
        description: 'must have at least 8 characters, including at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol (such as !, @, #, etc.)',
        required: true,
        example: 'myp@ss123'
    })
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @ApiProperty({
        description: 'must match to password',
        required: true,
        example: 'myp@ss123'
    })
    @IsNotEmpty()
    @IsStrongPassword()
    confirmPassword: string
 
    @ApiProperty({
        description: "user's adress",
        required: true,
        example: 'Av. Siempreviva 123AA'
    })
    @IsNotEmpty()
    @IsString()
    adress: string
    
    @ApiProperty({
        description: "user's phone number",
        example: 1234567891
    })
    @IsNotEmpty()
    @Transform(() => Number)
    phone: number
    
    @ApiProperty({
        description: "user's country",
    })
    @IsOptional()
    @IsString()
    country?: string | undefined
    
    @ApiProperty({
        description: "user's city"
    })
    @IsOptional()
    @IsString()
    city?: string | undefined
 
}