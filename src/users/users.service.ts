import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/account.dto';
import { User } from './interface/users.interface';

@Injectable()
export class UsersService {
  private readonly accounts: User[] = [];

  create(account: CreateAccountDto) {
    this.accounts.push(account);
  }

  findAll(): CreateAccountDto[] {
    return this.accounts;
  }
}
