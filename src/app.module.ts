import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { HomestayModule } from './homestays/homestays.module';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    UsersModule,
    HomestayModule,
    AdminModule,
    MongooseModule.forRoot(config.MongoURI),
    MulterModule.register({
      dest: './uploads'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
