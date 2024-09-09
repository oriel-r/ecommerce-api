import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { CredentialDTO } from "./entities/CredentialDTO";

@Injectable()
export class AuthServices {
    constructor(private userRepository:UsersRepository) {}
    getAll() {
        return 'Este es un get a auth'
    }

    singIn(credentialData: CredentialDTO) {
        const user = this.userRepository.findCredentials(credentialData)
        if(!user) return 'Alguno de los datos es incorrecto'
        else return 'Bienvenid@!'
    }
}