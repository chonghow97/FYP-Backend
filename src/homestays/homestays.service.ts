import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { Homestay } from './homestay.schema';

@Injectable()
export class HomestaysService {
  constructor(
    @InjectModel(Homestay.name) private homestayModel: Model<Homestay>,
  ) {}

  homestayList() {
    return 'hello world';
  }

  async create(payload) {
    const createdHomestay = new this.homestayModel(payload);
    createdHomestay.save();
  }
}
