import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AppModule } from "src/app.module"
import { UsersService } from "src/modules/users/users.service"
import { TypeOrmTestModule } from "test/test-data-source.config"
import { hash } from "bcrypt"
import { CredentialDTO } from "src/modules/auth/entities/credential.dto"
import { User } from "src/modules/users/entities/user.entity"
import request from 'supertest'

describe('User (e2e)', async() =>{
    let app: INestApplication
    let authToken: string
    let userService: UsersService

    beforeEach(async() => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, TypeOrmTestModule]
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
        
        userService = moduleFixture.get<UsersService>(UsersService)
        

        const hashedpassword = await hash('Mypass@123', 11)

        jest.spyOn(userService, 'findCredentials')
        .mockImplementation(async (data: CredentialDTO) => {
            if(data.email === 'ana@mail.com') return Promise.resolve({
                email: 'ana@mail.com',
                password: hashedpassword,
                is_admin: true
            } as User)
        })

        jest.spyOn(userService, 'getAll')
        .mockImplementation(async () => {
            return Promise.resolve([
                {
                    email: 'juan@mail.com',
                    id: 'kjasdñlkajsñlka1353',
                    orders: []
                }
            ] as User[])
        })
    })

    afterEach(async() => {
        await app.close()
    })

    const loginResponse = await request(app.getHttpServer())
})