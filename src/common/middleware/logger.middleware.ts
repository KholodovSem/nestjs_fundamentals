import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.time('Request-response time');

    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
