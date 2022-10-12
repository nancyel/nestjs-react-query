import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || 'user not found', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidPasswordException extends HttpException {
  constructor(message?: string) {
    super(message || 'incorrect password', HttpStatus.UNAUTHORIZED);
  }
}
