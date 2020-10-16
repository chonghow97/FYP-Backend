import { User } from './../users/schemas/user.schema';
import { userLoginDTO } from './../users/dto/userLogin.dto';
import { UsersService } from './../users/users.service';
import { Injectable } from "@nestjs/common";
import { compare } from 'bcrypt';

@Injectable()
export class AuthService{
    constructor(private readonly userService:UsersService){}

    async ValidateUser(payload:userLoginDTO): Promise<any>{
        const user:User = await this.userService.findEmail(payload.Email);
        if(user && compare(payload.Password,user.password)){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}