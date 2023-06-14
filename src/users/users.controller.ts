import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userServices.create(createUserDto);
  }
}
