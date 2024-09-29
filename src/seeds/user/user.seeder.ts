import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { UsersRepository } from "src/modules/users/users.repository";
import { Repository } from "typeorm";
import { admin } from "./user.mock";

@Injectable()
export class UserSeeder {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async seed() {
        try {
            const user = await this.userRepository.create( await admin)
            const result = await this.userRepository.save(user)
            console.log('Admin user is registered from seed')
        } catch(error) {
            console.log('Have a problem with user seed')
            console.error(error)
        }
    }
}