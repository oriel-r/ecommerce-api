import {
  CanActivate,
  ExecutionContext,
  HttpCode,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

function credentialValidate(req: Request) {
  const auth = req.headers.authorization;
  return auth === 'user@example.com:pass1234';
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'].split(' ')[1]
    try{
	    const secret = process.env.JWT_SECRET
	    const payload = await this.jwtService.verify(token,{ secret })
	    return true
    } catch(error){
	    return false
    }
  }
}