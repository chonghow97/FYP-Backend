import { Reservation, ReservationSchema } from './reservation.schema';
import { ReservationService } from './reservation.service';
import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HomestaysService } from 'src/homestays/homestays.service';
import { Homestay, HomestaySchema } from 'src/homestays/homestay.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),MongooseModule.forFeature([
      { name: Homestay.name, schema: HomestaySchema },
    ]),],
  controllers: [ReservationController],
  providers: [ReservationService,HomestaysService],
})
export class ReservationModule {}
