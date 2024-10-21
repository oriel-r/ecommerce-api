import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './entities/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { error } from 'console';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/utils/role.set';
import { Role } from '../auth/utils/roles.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Admin permissions required'
  })
  @ApiResponse({
    status:200
  })
  @ApiResponse({
    status: 404
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  getAll() {
    return this.userServices.getAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getById(@Param('id') id: string) {
    return this.userServices.getById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user data, send new data only'
  })
  @ApiResponse({
    status: 404,
    example: {
      status: 404,
      message: 'User not found',
      error: 'Not found'
    }
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  updateUserData(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userServices.updateUser(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 404,
    example: {
      status: 404,
      message: 'User not found',
      error: 'Not found'
    }
  })
  @ApiForbiddenResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.userServices.deleteUser(id);
  }
}
