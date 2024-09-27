import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CredentialDTO } from './entities/CredentialDTO';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { UserDTO } from '../users/entities/UserDTO';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './entities/CreateUserDTO';

@Injectable()
export class AuthServices {
  constructor(private userService: UsersService, private readonly jwtService: JwtService) {}
  getAll() {
    return 'Este es un get a auth';
  }

  async singUp(data: CreateUserDto) {
    const user = await this.userService.getEmail(data.email)
    if(user) throw new BadRequestException('this email is registred')
    if(data.password !== data.confirmPassword) throw new BadRequestException('Passwords don`t match')
    const hashpass = await bcrypt.hash(data.password, 11)
    if(!hashpass) throw new BadRequestException('password is not hashed')
    data.password = hashpass
    const {confirmPassword, ...newUserData} = data
    return this.userService.createUser(new UserDTO(newUserData))
  }

  async singIn(credentialData: CredentialDTO) {
    const user = await this.userService.getEmail(credentialData.email);
    if(!user) throw new BadRequestException('InvalidCredentials')
    const isValid = await bcrypt.compare(credentialData.password, user.password)
    if(!isValid) throw new BadRequestException('InvalidCredentials')
    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      isAdmin: user.is_admin
    }
    const token = this.jwtService.sign(payload)
    return {message: 'Access succesfully', token:token}
  }
}
