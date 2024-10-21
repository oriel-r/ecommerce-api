import { Test, TestingModule } from '@nestjs/testing';
import { AuthControllers } from './auth.controller';
import { AuthService } from './auth.service';
import { UserDTO } from '../users/entities/user.dto';
import { UsersService } from '../users/users.service';
import { CredentialDTO } from './entities/credential.dto';
import { CreateUserDTO } from './entities/create-user.dto';
import * as bcrypt from "bcrypt"
import { Role } from './utils/roles.enum';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthControllers;
  let mockRegistredUser: User;
  let mockNewUser: CreateUserDTO
  let mockRegistredUserCreate: CreateUserDTO

  beforeEach(async () => {

    const hashedpassword = await bcrypt.hash('Mypass@1234', 11)
    
    mockRegistredUser = {
      id: 'dasda11232a1s13a2s',
      name: 'Ana',
      email: 'ana@mail.com',
      password: 'Mypass@1234',
      is_admin: false,
      phone: 1124556677,
      adress: 'Calle falsa 123',
      orders: []
  } 

    const mockUserService: Partial<UsersService> = {
        getEmail: async (email) => {
          if(email === mockRegistredUser.email) {
            const {password, ...data} = mockRegistredUser
            return Promise.resolve({data, password: hashedpassword} as unknown as User)
          }
          return null
        },
        createUser: (data?: UserDTO) => Promise.resolve({
          ...data,
          id: '15asd43a5sd123',
          orders: [],
        }),
        findCredentials: (data? : CredentialDTO):Promise<User> => {
          if(data.email === mockRegistredUser.email) return Promise.resolve(mockRegistredUser)
          return Promise.resolve(undefined)
        },
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthControllers],
      providers: [ AuthService,
        {
          provide: getRepositoryToken(User), 
          useValue: {}
        },
        {
          provide: JwtService,
          useValue: {sign: () => Promise.resolve('aJasonWebToken')},
        },
        {
          provide: UsersService,
          useValue: mockUserService
        }
      ],
    }).compile();

    controller = module.get<AuthControllers>(AuthControllers);
  });

  

    mockNewUser = {
      name: 'Ana',
      email: 'juan@mail.com',
      password: '123456789',
      confirmPassword: '123456789',
      phone: 1124556677,
      adress: 'Calle falsa 123',
  }

  mockRegistredUserCreate = {
    name: 'Ana',
    email: 'ana@mail.com',
    password: '123456789',
    confirmPassword: '123456789',
    phone: 1124556677,
    adress: 'Calle falsa 123',
  }

  it('Should ne defined', async () => {
    expect(controller).toBeDefined()
  })

  it('Create a new user', async () =>{
    const result = await controller.singUp(mockNewUser)
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('orders')
  })

  it('Dont create a new user if email is registred', async() => {
    await expect(controller.singUp(mockRegistredUserCreate)).rejects.toThrow(ConflictException)
  })

  it('singIn() reject a non-existent user', async() => {
    await expect(controller.singIn(mockNewUser)).rejects.toThrow(UnauthorizedException)
  })

  it('when receiving valid credentials singIn() responds with a jwt ', async () => {
    await expect(controller.singIn({email: mockRegistredUser.email, password:mockRegistredUser.password}))
    .resolves.not.toThrow()
    await expect(controller.singIn({email: mockRegistredUser.email, password:mockRegistredUser.password}))
    .resolves
    .toHaveProperty('token')
  })

});
