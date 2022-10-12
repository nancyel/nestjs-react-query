import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from 'src/utils/exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: HttpException, user: any) {
    if (err || !user) {
      if (err instanceof HttpException) {
        throw new UnauthorizedException(
          err.message ||
            'Please provide a valid authentication token in the header.',
        );
      } else {
        throw new UnauthorizedException(
          'Please provide a valid authentication token in the header.',
        );
      }
    }
    return user;
  }
}
