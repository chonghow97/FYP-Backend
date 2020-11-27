import { Injectable } from "@nestjs/common";
import { Client, Config,CheckoutAPI } from '@adyen/api-library';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from '../reservation/reservation.dto';
import { Reservation } from '../reservation/reservation.schema';
const config = new Config();
// Set your X-API-KEY with the API key from the Customer Area.
config.apiKey = 'AQEjhmfuXNWTK0Qc+iSTmms2oOyUXzMpiIm2s592eWPL79bx/4MQwV1bDb7kfNy1WIxIIkxgBw==-Jlz1vA37aoz5/ZWxqzaTa50v7mcQIufMjrWxZz2/Fz4=-3B3FzAKq@9L<+WHr';
config.merchantAccount = 'ChonghowECOM';
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);

@Injectable()
export class PaymentService{
    constructor(@InjectModel(Reservation.name) private reservationModel: Model<Reservation>){}
    async get(){
        return await checkout.paymentMethods({ 
    merchantAccount: config.merchantAccount,
    allowedPaymentMethods:["grabpay"],
    countryCode: "MY",
    amount: { currency: "MYR", value: 1, },
    channel: "Web"
}).then(res => res);
    }

    post(){
        return checkout.payments({
            amount: { currency: "MYR", value: 1 },
            paymentMethod: {
                type: 'grabpay_MY'
            },
            reference: "YOUR_ORDER_NUMBER",
            merchantAccount: config.merchantAccount,
            returnUrl: "adyencheckout://your.package.name"
        }).then(res => res);
    }


    update(payload){
        return checkout.payments({
            amount: { currency: "MYR", value: 1 },
            paymentMethod: {
                type: 'grabpay_MY'
            },
            reference: payload.homestay,
            merchantAccount: config.merchantAccount,
            returnUrl: `http://localhost:3000/payment/detail?id=${payload.homestay}`
}).then(res => res);
    }
    detail(payload){
         
        if(payload.resultCode === 'cancelled'){
            //update database
            const update = this.reservationModel.findByIdAndUpdate(payload.id,{"isPaid" : true},
                    function(err,result){
                        if(err){
                            console.log(err,"123");
                        }else{
                            console.log(result,"456");
                        }
                    }
                );
           
            //redirect back to url
            return { url: 'http://localhost:8080/history' }
        }
    }
}