import { ReservationService } from './reservation.service';
import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
