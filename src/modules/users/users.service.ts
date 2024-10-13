import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from './entities/user.dto';
import { CredentialDTO } from '../auth/entities/credential.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { isEqual } from 'src/helpers/is-equial';

@Injectable()
export class UsersService {
  constructor( private userRepository: UsersRepository) {}
  
  async getAll(): Promise<Array<Omit<User, 'password'>>> {
    let allUsers= []
    const result = await this.userRepository.getUsers()
    if(!result.length) throw new NotFoundException('Users not found')
    for(const user of result) {
      const {password, ...userData} = user
      allUsers.push(userData)
    }
    return allUsers
  }

  async getById(id: string) {
    const user = await this.userRepository.getUserById(id);
    if(!user) throw new NotFoundException('User not found')
    const {password, is_admin, ...result} = user
      return result
  }
  
  async createUser(data: UserDTO) {
    const user = await this.userRepository.createUser(data)
    if(!user) throw new BadRequestException('have a problem with create user')
    const {password, is_admin, ...userdata} = user
  return userdata
  }
  
  async updateUser(id: string, data: UserDTO) {
    const user = await this.userRepository.getUserById(id)
    if(!user) throw new NotFoundException('User not found')
    if(isEqual(data, user)) throw new HttpException('No have new data', HttpStatus.NO_CONTENT)
    const result = this.userRepository.updateUser(id, data)
  return {message: 'Successfully updated', result}
  }
  
  async deleteUser(id: string) {
    const user = await this.userRepository.getUserById(id)
    if(!user) throw new NotFoundException('User not found')
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
