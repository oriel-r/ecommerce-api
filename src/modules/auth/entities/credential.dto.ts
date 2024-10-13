import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CredentialDTO {

  @ApiProperty({
    example: 'juan@email.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: 'juan@123'
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
