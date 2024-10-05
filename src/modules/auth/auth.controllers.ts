import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthServices } from './auth.services';
import { CredentialDTO } from './entities/credential.dto';
import { UserDTO } from '../users/entities/user.dto';
import { CreateUserDTO } from './entities/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthControllers {
  constructor(private authService: AuthServices) {}

  @Get()
  async getAll() {
    return await this.authService.getAll();
  }

  @Post('/singup')
  async singUp(@Body() userData: CreateUserDTO) {
    return await this.authService.singUp(userData)
  } 

  @Post('/singin')
  async singIn(@Body() credentialData: CredentialDTO) {
    return await this.authService.singIn(credentialData);
  }
}
