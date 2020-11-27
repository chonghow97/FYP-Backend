import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from './reservation.dto';
import { Reservation } from './reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async getAll(){
    return this.reservationModel.find({isPaid: true});
  }
  async findOne(payload) {
    const {id} = payload;
    //find userid 
    //5f8da6388139221af80efa35
    const homestay = await this.reservationModel.find({"userID.id": id}).select(" -_v");
    //find homestay name

    //replace home

    return homestay;
  }

  async validate(payload: ReservationDto) {
    payload.isPaid = false; //append default ispaid value
    const newHomestay = new this.reservationModel(payload);  // construct a database form
    //deconstruct
    const {startDate,endDate,homestay} = newHomestay;
    //find exist homestay
    const homestays = await this.reservationModel.find({
      "homestay.id": homestay.id,
    });

    if(homestays.length){ //checking 
      //homestay exist
      //compare all homestay
      const homestay = homestays.map((x)=> {
        if(x.endDate >= startDate && endDate >= x.startDate){ //reservation validation
          //room reserved
          //trow error
          throw new HttpException('Method Not Allowed', HttpStatus.METHOD_NOT_ALLOWED);
        }
      });
    }

    //done checking
    //save into database
    newHomestay.save();
    return homestay;
  }
}
