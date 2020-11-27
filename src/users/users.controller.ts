import { userLoginDTO } from './dto/userLogin.dto';
import { ValidationPipe } from './../util/joi-validation.pipe';
import { CreateAccountDto, CreateAccountSchema } from './dto/account.dto';
import { UsersService } from './users.service';
import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private readonly mailerService: MailerService,
    ) {}

    @Post('password')
    forgetPassword(@Body() payload) {
        return this.usersService.forgetPassword(payload);
    }
    @Get()
    getUserList() {
        return this.usersService.getUserList();
    }

    @Post('login')
    async login(@Body() user: userLoginDTO) {
        return await this.usersService.login(user);
    }

    @Post('register')
    async create(
        @Body(new ValidationPipe(CreateAccountSchema))
        createAccountDto: CreateAccountDto,
    ) {
        return this.usersService.create(createAccountDto);
    }
}
