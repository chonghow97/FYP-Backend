import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document{
    @Prop({ required: true })
    userID: string;
    @Prop({ required: true })
    startDate: Date;
    @Prop({ required: true })
    endDate: Date;
    @Prop({ required: true })
    homestay: string;
    @Prop({ required: true })
    amount: Number;
    @Prop({ required: true })
    isPaid: Boolean;

} 

export const ReservationSchema = SchemaFactory.createForClass(Reservation);