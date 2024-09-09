import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserDTO } from "./entities/UserDTO";

@Injectable()
export class UsersService {
    constructor(private userRepository: UsersRepository) {}
    getAll() {
        return this.userRepository.getAll()
    }
    getById(id) {
        return this.userRepository.getById(id)
    }
    createUser(data){
        return this.userRepository.createUser(data)
    }
    updateUser(id:string, data:UserDTO) {
        return this.userRepository.updateUserData(id, data)
    }
    deleteUser(id:string) {
        return this.userRepository.deleteUser(id)
    }
}