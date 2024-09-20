import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CredentialDTO } from './entities/CredentialDTO';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthServices {
  constructor(private userService: UsersService) {}
  getAll() {
    return 'Este es un get a auth';
  }

  async singIn(credentialData: CredentialDTO) {
    const user = await this.userService.findCredentials(credentialData);
    if(user) return "Hola!"
  }
}
