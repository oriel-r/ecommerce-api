import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialDTO } from './entities/credential.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { UserDTO } from '../users/entities/user.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './entities/create-user.dto';
import { Role } from './utils/roles.enum';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private readonly jwtService: JwtService) {}
  getAll() {
    return 'Este es un get a auth';
  }

  async singUp(data: CreateUserDTO) {
    const user = await this.userService.getEmail(data.email)
    if(user) throw new ConflictException('This email is registred')
    if(data.password !== data.confirmPassword) throw new BadRequestException('Passwords don`t match')
    const hashpass = await bcrypt.hash(data.password, 11)
    if(!hashpass) throw new BadRequestException('password is not hashed')
    data.password = hashpass
    const {confirmPassword, ...newUserData} = data
    return this.userService.createUser(new UserDTO(newUserData))
  }

  async singIn(credentialData: CredentialDTO) {
    const user = await this.userService.getEmail(credentialData.email);
    if(!user) throw new UnauthorizedException('Invalid credentials')
    const isValid = await bcrypt.compare(credentialData.password, user.password)
    if(!isValid) throw new UnauthorizedException('Invalid credentials')
    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: user.is_admin ? Role.ADMIN : Role.USER
    }
    console.log(payload)
    const token = this.jwtService.sign(payload)
    return {message: 'Access succesfully', token:token}
  }
}
