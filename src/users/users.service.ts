import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/account.dto';

@Injectable()
export class UsersService {
  private readonly accounts: CreateAccountDto[] = [];

  create(account: CreateAccountDto) {
    this.accounts.push(account);
  }

  findAll(): CreateAccountDto[] {
    return this.accounts;
  }
}
