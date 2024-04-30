import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { tap } from 'rxjs/operators';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Before...');

    const req = context.switchToHttp().getRequest<Request>();

    req.user = { lol: 'kek' };

    console.log(req.user);

    return next.handle().pipe(tap(() => console.log('After ...')));
  }
}
