import { Controller, Post, UseGuards } from '@nestjs/common';
import { RequestUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @RequestUser() user: User,
  ): Promise<{ message: string; data: any }> {
    const token = await this.authService.login(user);
    return { message: 'Email login was successful.', data: { token } };
  }
}
