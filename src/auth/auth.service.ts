import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReadUserDto } from '../users/dto/read_user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result; // renvoi user sans password
    }
    return null;
  }

  async login(readUserDto: ReadUserDto) {
    const user = await this.usersService.findOne(readUserDto.email);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== readUserDto.password) {
      throw new NotFoundException();
    }
    const payload = {
      createdAt: new Date().toISOString(),
      sub: user._id,
      role: 'user',
    };
    if (user.email === 'charlesdiallo@hotmail.fr') {
      payload.role = 'admin';
    }
    return { access_token: this.jwtService.sign(payload) };
  }
}
