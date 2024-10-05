import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './entities/user.dto';
import { CredentialDTO } from '../auth/entities/credential.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor( private userRepository: UsersRepository) {}
  
  async getAll() {
    return this.userRepository.getUsers();
  }

  async getById(id) {
    return this.userRepository.getUserById(id);
  }
  
  async createUser(data: UserDTO) {
    const user = await this.userRepository.createUser(data)
    if(!user) throw new BadRequestException('have a problem with create user')
    const {password, ...userdata} = user
  return userdata
  }
  
  async updateUser(id: string, data: UserDTO) {
    return this.userRepository.updateUser(id, data)
  }
  
  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
  
  async findCredentials(data: CredentialDTO) {
    return this.userRepository.findCredentials(data);
  }

  async getUserForOrder(id:string) {
    return this.userRepository.getUserByIdForOrder(id)
  }

  async getEmail(email: string) {
    return await this.userRepository.findEmail(email)
  }
}
