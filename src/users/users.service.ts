import { MailerService } from '@nestjs-modules/mailer';
import { userLoginDTO } from './dto/userLogin.dto';
import { User } from './schemas/user.schema';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAccountDto } from './dto/account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private readonly mailerService: MailerService,
    ) {}

    async forgetPassword(payload) {
        //find userID
        const user = this.userModel.find({ email: payload.email }).exec();
        //trow error 404
        if ((await user).length !== 1)
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        //generate random password
        const newPassword = Math.round(Math.random() * 100000000);
        //send email
        this.mailerService
            .sendMail({
                to: 'test@nestjs.com', // list of receivers
                from: 'noreply@nestjs.com', // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: `this new password is <b>${newPassword}</b>`, // HTML body content
            })
            .then(() => {
                //update password from database
                // this.userModel.findOneAndUpdate({ email: payload.email });
            })
            .catch(() => {});
        return payload.email;
    }

    async create(createAccountDto: CreateAccountDto): Promise<string> {
        try {
            const hashedPassword = await hash(createAccountDto.password, 10);
            createAccountDto = {
                ...createAccountDto,
                ...{ password: hashedPassword },
            };
            const createdUser = new this.userModel(createAccountDto);
            await createdUser.save();
            return 'Account created Successfully';
        } catch (error) {
            return `${error.keyValue.email} has registered`;
        }
    }

    async getUserList() {
        return await this.userModel.find();
    }

    async login(payload: userLoginDTO) {
        const user = await (
            await this.userModel.findOne({ email: payload.email })
        ).toJSON();
        const { password, ...result } = user;
        if (await compare(payload.password, password)) {
            return result;
            //  return {
            //   access_token: this.jwtService.sign(result),
            // };
        } else {
            return null;
        }
    }
}
