import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { Homestay, HomestaySchema } from './homestay.schema';

@Injectable()
export class HomestaysService {
  constructor(
    @InjectModel(Homestay.name) private homestayModel: Model<Homestay>,
  ) {}

  async homestayList() {
    return await this.homestayModel.find();
  }
  
  async create(payload) {
    const createdHomestay = new this.homestayModel(payload);
    createdHomestay.save();
    return createdHomestay;
  }

  async update(payload){
    const {_id,__v,image,...result} = payload.homestay;
    // console.log(_id,"id",result,"result");
    this.homestayModel.findByIdAndUpdate(
    _id,
    result,
    function(err, result) {
      if (err) {
        return "updated successfully"
      } else {
        return "updated successfully"
      }
    }
  );
    return "updated successfully";
  }

  async findOne(id: String){
    return await this.homestayModel.findOne({_id: id});
  }

  async deleteThis(id: String){
    return await this.homestayModel.findByIdAndDelete({_id: id});
  }

  
}
