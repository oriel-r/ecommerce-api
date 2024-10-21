import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from './entities/create-user.dto';
import { UserDTO } from '../users/entities/user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { isHash } from 'class-validator';

describe('AuthService tests', () => {
  let service: AuthService;
  let mockUser: CreateUserDTO

  beforeEach(async () => {
    
    const mockUserService: Partial<UsersService> = {
        getEmail: () => Promise.resolve(undefined),
        createUser: (data?: UserDTO) => Promise.resolve({
          ...data,
          password: data.password,
          id: '15asd43a5sd123',
          orders: [],
        }),
    }

     mockUser = {
      name: 'Ana',
      email: 'ana@mail.com',
      password: 'Mypass@12345',
      confirmPassword: 'Mypass@12345',
      phone: 1124556677,
      adress: 'Calle falsa 123',
  }
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, 
        {provide: getRepositoryToken(User), useValue: {}},
        {provide: JwtService, useValue: {}},
        {provide: UsersService, useValue: mockUserService}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('singUp() returns a new UserDTo with id and orders array', async () => {
    const user = await service.singUp(mockUser)
    expect(user).toHaveProperty("id")
    expect(user).toHaveProperty("orders")
  })

  it('singUp() retuns a hashed password', async () => {
    const user = await service.singUp(mockUser)
    const isMatch = await bcrypt.compare('Mypass@12345', user['password'])
    expect(user).toHaveProperty('password')
    expect(user['passwrod']).not.toBe(mockUser.password)
    expect(isMatch).toBe(true)
  })

});
