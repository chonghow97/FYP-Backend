import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Homestay extends Document {
  @Prop({ required: true })
  name: String;
  @Prop({ required: true })
  capacity: number;
  @Prop({ required: true })
  description: string;
  @Prop()
  photo: String;
  @Prop()
  price: Number;
  @Prop()
  color: String;
  @Prop()
  isActive: Boolean;
}

export const HomestaySchema = SchemaFactory.createForClass(Homestay);
