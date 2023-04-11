import { Injectable, type ExecutionContext } from '@nestjs/common';
import { AuthGuard, type IAuthGuard } from '@nestjs/passport';
import { type Request } from 'express';
import { type User } from '../modules/user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: any = context.switchToHttp().getRequest();
    return !(user == null);
  }
}
