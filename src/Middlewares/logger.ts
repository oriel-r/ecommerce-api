import { NextFunction, Request, Response } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`You do a ${req.method} in ${req.url} at ${new Date}`);
  next()
}
