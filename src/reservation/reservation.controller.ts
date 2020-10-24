import { ReservationService } from './reservation.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReservationModule } from './reservation.module';
import { HomestayDto } from 'src/homestays/dto/homestay.dto';
import { ReservationDto } from './reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  findone() {
    return 'none';
  }

  @Post()
  validateaHomestay(@Body() payload:ReservationDto){
    return this.reservationService.validate(payload);
  }
}
