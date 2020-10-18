import { userLoginDTO } from './dto/userLogin.dto';
import { ValidationPipe } from './../util/joi-validation.pipe';
import { CreateAccountDto, CreateAccountSchema } from './dto/account.dto';
import { UsersService } from './users.service';
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUserList() {
    return this.usersService.getUserList();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() req){
    console.log(req,"asdasd");
  }

  @Post('register')
  async create(
    @Body(new ValidationPipe(CreateAccountSchema))
    createAccountDto: CreateAccountDto,
  ) {
      return this.usersService.create(createAccountDto) ;
  }

  
}
