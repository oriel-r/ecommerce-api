import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './entities/UserDTO';
import { CredentialDTO } from '../auth/entities/CredentialDTO';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor( private userRepository: UsersRepository) {}
  
  getAll() {
    return this.userRepository.getUsers();
  }

  getById(id) {
    return this.userRepository.getUserById(id);
  }
  
  createUser(data: UserDTO) {
    return this.userRepository.createUser(data)
  }
  
  updateUser(id: string, data: UserDTO) {
    return this.userRepository.updateUser(id, data)
  }
  
  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
  
  findCredentials(data: CredentialDTO) {
    return this.userRepository.findCredentials(data);
  }

  getUserForOrder(id:string) {
    return this.userRepository.getUserByIdForOrder(id)
  }
}
