import { ValidationPipe } from './../util/joi-validation.pipe';
import { CreateAccountDto, CreateAccountSchema } from './dto/account.dto';
import { UsersService } from './users.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUserList() {
    return this.usersService.getUserList();
  }

  @Post('register')
  create(
    @Body(new ValidationPipe(CreateAccountSchema))
    createAccountDto: CreateAccountDto,
  ) {
    return this.usersService.create(createAccountDto);
  }
}
