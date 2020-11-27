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
                host: 'smtp.example.com',
                port: 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: 'username',
                    pass: 'password',
                },
            },
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
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
