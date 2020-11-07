import { userLoginDTO } from './dto/userLogin.dto';
import { User } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,private jwtService: JwtService) {}

  async create(createAccountDto: CreateAccountDto): Promise<string> {
    try {
      const hashedPassword = await hash(createAccountDto.password,10);
      createAccountDto = {...createAccountDto,...{password: hashedPassword}};
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

  async login(payload:userLoginDTO){
    const user = await (await this.userModel.findOne({email: payload.email})).toJSON();
    const {password,...result} = user;
    if(await compare(payload.password, password)){
      return result;
    //  return {
    //   access_token: this.jwtService.sign(result),
    // };
    }else{
     return null;
    }
  }
}
