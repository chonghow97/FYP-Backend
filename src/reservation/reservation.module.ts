import { Reservation, ReservationSchema } from './reservation.schema';
import { ReservationService } from './reservation.service';
import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
