import { ReservationService } from './reservation.service';
import { Controller, Get } from '@nestjs/common';
import { ReservationModule } from './reservation.module';

@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  findone() {
    return 'none';
  }
}
