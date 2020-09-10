import { CreateAccountDto } from './dto/account.dto';
import { UsersService } from './users.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getHello(): string {
    return 'Hello Success!';
  }

  @Post()
  create(@Body() createAccountDto: CreateAccountDto): string {
    this.usersService.create(createAccountDto);
    return 'import Success';
  }
}
