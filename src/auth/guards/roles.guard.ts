import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/utils/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException('Unauthorized user');
    }
    const hasRequiredRole = requiredRoles.some((role) =>
      user.role?.includes(role),
    );

    if (!hasRequiredRole) {
      throw new UnauthorizedException('Unauthorized user role');
    }
    return true;
  }
}
