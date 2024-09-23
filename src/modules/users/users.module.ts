import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthServices } from '../auth/auth.services';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ],
  providers: [ UsersService, UsersRepository ],
  controllers: [ UsersController ],
  exports: [ UsersService, UsersRepository ],
})
export class UsersModule {}
