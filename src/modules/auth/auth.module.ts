import { Module } from "@nestjs/common";
import { AuthServices } from "./auth.services";
import { AuthControllers } from "./auth.controllers";
import { UsersModule } from "../users/users.module";
import { UsersRepository } from "../users/users.repository";

@Module({
    providers: [AuthServices, UsersRepository],
    controllers: [AuthControllers]
})
export class AuthModule {}