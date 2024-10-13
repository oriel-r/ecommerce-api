import {
  CanActivate,
  ExecutionContext,
  HttpCode,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Role } from './utils/roles.enum';
import * as dotenv from "dotenv"
import { extractRequest } from 'src/helpers/extract-request';

dotenv.config({path: "env.development.local"})

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = extractRequest(context)
    const token = req.headers['authorization'].split(' ')[1]
    try{
	    const secret = process.env.JWT_SECRET
	    const payload = await this.jwtService.verify(token,{ secret })
      if(payload.is_admin) {
        payload.role = Role.ADMIN
      }
      req.user = payload
	    return true
    } catch(error){
	    return false
    }
  }
}