import { Controller, Post, Body } from '@nestjs/common';
import { ReadUserDto } from '../users/dto/read_user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() readUserDto: ReadUserDto) {
    return this.authService.login(readUserDto);
  }
}
