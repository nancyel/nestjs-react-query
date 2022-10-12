import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { User } from 'src/users/schemas/user.schema';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DocumentType<User> => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
