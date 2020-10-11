import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { HomestayModule } from './homestays/homestays.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    HomestayModule,
    MongooseModule.forRoot(config.MongoURI),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/upload',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
