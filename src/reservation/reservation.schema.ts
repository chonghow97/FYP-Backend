import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document{
    @Prop()
    userID: {id: string, name:string, contact: string};
    @Prop({ required: true })
    startDate: Date;
    @Prop({ required: true })
    endDate: Date;
    @Prop()
    homestay: {id: string, name: string};
    @Prop({ required: true })
    amount: Number;
    @Prop({ required: true })
    isPaid: Boolean;

} 

export const ReservationSchema = SchemaFactory.createForClass(Reservation);