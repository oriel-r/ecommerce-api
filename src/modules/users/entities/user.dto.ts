import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Order } from "src/modules/orders/entities/order.entity";
import { DeepPartial } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
  @ApiProperty({
     type: 'varchar',
      maxLength: 50
  })
   @IsNotEmpty()
   @IsString()
   name: string
   
   @ApiProperty({
    type: 'varchar',
    maxLength: 50,
    uniqueItems: true
  })
   @IsNotEmpty()
   @IsEmail()
   email: string

   @ApiProperty({
    description: 'A hashed password',
    type: 'varchar'
  })
   @IsNotEmpty()
   @IsStrongPassword()
   password: string

   @ApiProperty({
    description: "User's adress",
    type: 'varchar'
  })
   @IsNotEmpty()
   @IsString()
   adress: string

   @ApiProperty({
    description: 'String is parsed to nuber',
    type: 'varchar'
  })
   @IsNotEmpty()
   @Transform(() => Number)
   phone: number

   @ApiProperty({
    description: 'Property used for asign admins'
   })
   @IsOptional()
   @IsBoolean()
   is_admin: boolean
   
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