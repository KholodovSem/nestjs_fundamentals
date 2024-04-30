import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class RolesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.user = {
      roles: ['user', 'admin'],
    };

    console.log('Inside middleware: ', req.user);

    next();
  }
}
