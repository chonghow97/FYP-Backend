import { userLoginDTO } from './dto/userLogin.dto';
import { User } from './schemas/user.schema';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAccountDto } from './dto/account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private readonly mailerService: MailerService,
    ) {}

    async forgetPassword(payload): Promise<string> {
        //find userID
        const user = this.userModel
            .find({
                email: payload.email,
            })
            .exec();
        //trow error 404
        if ((await user).length !== 1)
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        //generate random password
        const newPassword = Math.round(Math.random() * 100000000);
        //encrypt it
        const hashed = await hash(newPassword.toString(), 10);
        //update database
        await this.userModel.findByIdAndUpdate(
            (await user)[0]._id,
            { password: hashed },
            function(err, result) {
                if (err) {
                    err;
                } else {
                    result;
                }
            },
        );
        //send email
        this.sendEmail(payload.email, newPassword);
        return 'Password Updated Successfully please check your email';
    }

    async sendEmail(sender, newPassword) {
        return await this.mailerService
            .sendMail({
                to: sender, // list of receivers
                subject: 'Password updated ✔', // Subject line
                html: `Your new password is <b>${newPassword}</b>`, // HTML body content
            })
            .then(() => {})
            .catch(() => {});
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
