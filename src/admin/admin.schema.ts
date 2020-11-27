import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class admin extends Document{
    @Prop({ required: true })
    Name: String;
    @Prop({ required: true })
    Password: String;
    @Prop({ required: true })
    Email: String;
} 

export const adminSchema = SchemaFactory.createForClass(admin);