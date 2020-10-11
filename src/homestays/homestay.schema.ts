import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Homestay extends Document {
  @Prop({ required: true })
  name: String;
  @Prop()
  capacity: number;
  @Prop()
  description: string;
  @Prop()
  photo: String;
}

export const HomestaySchema = SchemaFactory.createForClass(Homestay);
