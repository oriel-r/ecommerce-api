import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Order } from "src/modules/orders/entities/order.entity";
import { DeepPartial } from "typeorm";

export class UserDTO {
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

  constructor(partial: DeepPartial<UserDTO>) {
    Object.assign(this, partial)
  }

}