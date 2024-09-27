import { IsEmail, IsNotEmpty, IsStrongPassword, IsString, IsOptional, Matches } from "class-validator"
import { Transform } from "class-transformer"
import { Order } from "src/modules/orders/entities/order.entity"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsEmail()
    email: string
 
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsStrongPassword()
    confirmPassword: string
 
    @IsNotEmpty()
    @IsString()
    adress: string
    
    @IsNotEmpty()
    @Transform(() => Number)
    phone: number
    
    @IsOptional()
    @IsString()
    country?: string | undefined
    
    @IsOptional()
    @IsString()
    city?: string | undefined
    
    @IsOptional()
    order?: Order[]
 
}