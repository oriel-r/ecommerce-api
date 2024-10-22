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
            const newUser = await admin
             await this.userRepository.save(
                this.userRepository.create(newUser)
             )
            console.log('Admin user was created by seed')
        } catch(error) {
            console.log('admin user already exist')        }
    }
}