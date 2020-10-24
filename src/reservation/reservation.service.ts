import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from './reservation.dto';
import { Reservation } from './reservation.schema';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(Reservation.name) private reservationModel: Model<Reservation>){}
  findOne() {
    return 'findOne';
  }

 async validate(payload:ReservationDto){
   //find same homestay
   const homestays = await this.reservationModel.find({homestay: payload.homestay});
   //if have result
   //if result min date >= max date AND max date =< min date
    return "Successs save database";
  }
}
