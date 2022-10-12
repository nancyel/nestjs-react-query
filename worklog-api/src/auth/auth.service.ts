import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User): Promise<string> {
    return this.getJwtToken(user.email, user._id.toHexString());
  }

  private getJwtToken(email: string, userId: string) {
    const payload: TokenPayload = { email, userId };
    return this.jwtService.sign(payload);
  }
}
