import { userLoginDTO } from './../users/dto/userLogin.dto';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,"local"){
    constructor(private authService: AuthService) {
    super();
  }

  async validate(@Body() payload:userLoginDTO): Promise<any> {
    const user = await this.authService.ValidateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}