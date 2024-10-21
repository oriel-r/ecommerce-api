import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialDTO } from './entities/credential.dto';
import { UserDTO } from '../users/entities/user.dto';
import { CreateUserDTO } from './entities/create-user.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthControllers {
  constructor(private authService: AuthService) {}

  @Post('/singup')
  @ApiOperation({
    summary: 'Create a new user'
  })
  @ApiResponse({
    status:201, 
    example: {
      id: 'an uuid',
      name: "Juan Pérez",
      email: "juan@email.com",
      is_admin: false,
      phone: 123456789,
      adress: "123 Calle Falsa",
      country: "Argentina",
      city: "Buenos Aires"
    },
  })
  @ApiResponse({
    status: 409,
    example: {
      message: 'This emails is registered'
    }
  })
  async singUp(@Body() userData: CreateUserDTO) {
    return await this.authService.singUp(userData)
  } 

  @Post('/singin')
  @ApiOperation({
    summary: 'Sing in app'
  })
  @ApiResponse({
    status: 200,
    example: {
      message: 'Access succesfully',
      token: 'A JWT'
    }
  })
  @ApiUnauthorizedResponse({example: {message: 'Invalid credentials'}})
  async singIn(@Body() credentialData: CredentialDTO) {
    return await this.authService.singIn(credentialData);
  }
}
