import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthControllers } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User]), UsersModule ],
  providers: [ AuthService, UsersService ],
  controllers: [ AuthControllers ],
})
export class AuthModule {}
