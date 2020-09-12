import { User } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createAccountDto: CreateAccountDto): Promise<User> {
    const createdUser = new this.userModel(createAccountDto);
    return await createdUser.save();
  }

  async getUserList() {
    return await this.userModel.find();
  }
}
