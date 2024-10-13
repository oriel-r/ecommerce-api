import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./entities/user.dto";
import { CredentialDTO } from "../auth/entities/credential.dto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository <User> 
    ) {}

    async getUsers() {
        return await this.userRepository.find()
    }

    async getUserById(id:string) {
        return await this.userRepository.findOneBy({id})
    }

    async getUserByIdForOrder(id:string) {
        const user = await this.userRepository.findOneBy({id: id})
        if(!user) return false
        else return user
    }

    async createUser(data: UserDTO) {
        const user = await this.userRepository.create(data)
        await this.userRepository.save(user);
        return user
      }
      
      async updateUser(id: string, data: UserDTO) {
        const user = await this.userRepository.findOneBy({id: id});
        if(user) {
          await this.userRepository.update(id, data)
          return user
        } else throw new HttpException(`the user with id ${id} is not found`, HttpStatus.NOT_FOUND)
      }
      
      async deleteUser(id: string) {
        return await this.userRepository.delete(id);
      }
      
      async findCredentials(data: CredentialDTO) {
        return await this.userRepository.findOneBy({email: data.email, password: data.password});
      } 
      
      async findEmail(email:string) {
        const user = this.userRepository.findOneBy({email: email})
        return user
      }
}