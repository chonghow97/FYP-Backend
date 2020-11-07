import { HomestaysService } from './../homestays/homestays.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from './reservation.dto';
import { Reservation } from './reservation.schema';
import { maxHeaderSize } from 'http';
import { Homestay } from 'src/homestays/homestay.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    @InjectModel(Homestay.name) private homestayModel: Model<Homestay>
  ) {}


  async findOne(payload) {


    const {id} = payload;
    //find userid 
    const order = await this.reservationModel.aggregate([

        { $lookup: ({ from: 'homestays', localField: 'homestay', foreignField: '_id', as: 'homestay_joined' })},

  
  // { $unwind: "$homestay_joined" },
  // {
  //   $project: {  
  //       "_id": 1,
  //       "startDate": 1,
  //       "endDate": 1,
  //       "homestay": "$homestay_joined.name",
  //       "amount": 1,
  //       "isPaid": 1
  //   }
  // }
]);
    const homestay = await this.homestayModel.find({_id: "5f9f83807e7f885d78df892e"}).select("name -_id");
    const homestayID = order.map(x=>x.homestay );
    //find homestay name

    //replace home

    return order;
  }

  async validate(payload: ReservationDto) {
    payload.isPaid = false; //append default ispaid value
    const newHomestay = new this.reservationModel(payload);  // construct a database form
    //deconstruct
    const {startDate,endDate,homestay} = newHomestay;
    //find exist homestay
    const homestays = await this.reservationModel.find({
      homestay: homestay,
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
