import { userLoginDTO } from './dto/userLogin.dto';
import { User } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {hash} from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createAccountDto: CreateAccountDto): Promise<string> {
    try {
      createAccountDto.password = await hash("createAccountDto.password",10);
      const createdUser = new this.userModel(createAccountDto);
      await createdUser.save();
      return "Account created Successfully";
    } catch (error) {
      console.log(error.keyValue.email);
      return `${error.keyValue.email} has registered`;
    }
    
  }



  async getUserList() {
    return await this.userModel.find();
  }

  async findEmail(Email: string):Promise<User>{
    const user = await this.userModel.findOne({"email": Email});
    console.log(user);
    return user;
  }
}
