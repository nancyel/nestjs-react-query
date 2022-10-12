import { Request } from 'express';
import { UnauthorizedException } from './exception';

export const tokenExtractor = (req: Request): string | null => {
  const token = req.headers.authorization;
  if (!token) {
    throw new UnauthorizedException('Authorization header is required.');
  }
  return token;
};
