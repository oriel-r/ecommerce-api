import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthServices } from "./auth.services";
import { CredentialDTO } from "./entities/CredentialDTO";

@Controller('auth')
export class AuthControllers {
    constructor(private authService: AuthServices) {}

    @Get()
    getAll() {
        return this.authService.getAll()
    }

    @Post('/singin')
    singIn(@Body() credentialData:CredentialDTO) {
        return this.authService.singIn(credentialData)
    }
}