import { ReservationService } from './reservation.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReservationModule } from './reservation.module';
import { HomestayDto } from 'src/homestays/dto/homestay.dto';
import { ReservationDto } from './reservation.dto';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  getAll(){
    return this.reservationService.getAll();
  }
  @Get(':id')
  findone(@Param() params) {
    return this.reservationService.findOne(params);
  }

  @Post()
  validateaHomestay(@Body() payload:ReservationDto){
    return this.reservationService.validate(payload);
  }
}
