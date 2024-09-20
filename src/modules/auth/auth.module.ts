import { Module } from '@nestjs/common';
import { AuthServices } from './auth.services';
import { AuthControllers } from './auth.controllers';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User]) , UsersModule ],
  providers: [ AuthServices, UsersService ],
  controllers: [ AuthControllers ],
})
export class AuthModule {}
