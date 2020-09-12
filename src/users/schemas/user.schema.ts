import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({ required: true })
  fName: string;
  @Prop({ required: true })
  lName: string;
  @Prop({ required: true })
  code: number;
  @Prop({ required: true })
  phone: number;
  @Prop({ required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
