import { PaymentService } from './payment.service';
import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from '../reservation/reservation.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),],
    controllers:[PaymentController],
    providers:[PaymentService],
})

export class PaymentModule{}