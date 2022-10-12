import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.mockGetOne({ email });

    if (user) {
      // await this.usersService.comparePassword(password, user.passwordHash);
      await this.usersService.mockComparePassword(password, user.passwordHash);
      return user;
    }
    return null;
  }
}
