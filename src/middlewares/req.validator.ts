import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { valueChecker } from 'src/helpers/valueChecker';

@Injectable()
export class ReqBodyChecker implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const isValid = valueChecker(body);
    if (!isValid.isValid) {
      throw new HttpException(
        `Value for ${isValid.key} is invalid`,
        HttpStatus.BAD_REQUEST,
      );
    } else next();
  }
}
