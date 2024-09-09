import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDTO } from "./entities/UserDTO";
import { AuthGuard } from "../auth/auth.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly userServices : UsersService) {}
    
    @Get()
    @UseGuards(AuthGuard)
    getAll() {
        return this.userServices.getAll()
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getById(@Param('id') id: string) {
        return this.userServices.getById(id)
    }
    
    @Post()
    createUser(@Body() userData:UserDTO) {
        return this.userServices.createUser(userData)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateUserData(@Param('id') id:string, @Body() data:UserDTO) {
        return this.userServices.updateUser(id, data)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id:string) {
        return this.userServices.deleteUser(id)
    }
}