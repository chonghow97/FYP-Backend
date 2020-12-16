import { ReservationModule } from './reservation/reservation.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { HomestayModule } from './homestays/homestays.module';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
    imports: [
        UsersModule,
        HomestayModule,
        AdminModule,
        ReservationModule,
        PaymentModule,
        MongooseModule.forRoot(config.MongoURI),
        MulterModule.register({
            dest: './uploads',
        }),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // upgrade later with STARTTLS
                auth: {
                    user: 'tanchonghow1997@gmail.com',
                    pass: '',
                },
            },
            defaults: {
                from: '"no Reply" <tanchonghow1997@gmail.com>',
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
