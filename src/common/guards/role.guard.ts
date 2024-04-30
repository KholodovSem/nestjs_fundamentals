import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user: Record<string, any> }>();
    const handler = context.getHandler();

    const routeRoles = this.reflector.get<string[]>(ROLES_KEY, handler);
    const userRoles = req?.user?.roles;

    if (!userRoles) return false;

    return userRoles.some((role: string) => routeRoles.includes(role));
  }
}
