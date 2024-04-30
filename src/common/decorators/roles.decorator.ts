import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'app_roles';
export const Roles = (...roles: string[]) =>
  SetMetadata<string, string[]>(ROLES_KEY, roles);
