import { HomestaysService } from './homestays.service';
import { HomestaysController } from './homestays.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Homestay, HomestaySchema } from './homestay.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Homestay.name, schema: HomestaySchema },
    ]),
  ],
  controllers: [HomestaysController],
  providers: [HomestaysService],
  exports: []
})
export class HomestayModule {}
