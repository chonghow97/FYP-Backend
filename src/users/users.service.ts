import { User } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {hash} from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createAccountDto: CreateAccountDto): Promise<User> {
    createAccountDto.password = await hash("createAccountDto.password",10);
    const createdUser = new this.userModel(createAccountDto);
    console.log(createdUser);
    return createdUser;
    // return await createdUser.save();
  }

  async getUserList() {
    return await this.userModel.find();
  }
}
