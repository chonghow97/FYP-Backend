import { Injectable } from '@nestjs/common';
import { Client, Config, CheckoutAPI } from '@adyen/api-library';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from '../reservation/reservation.dto';
import { Reservation } from '../reservation/reservation.schema';
const config = new Config();
// Set your X-API-KEY with the API key from the Customer Area.
config.apiKey =
    'AQEjhmfuXNWTK0Qc+iSTmms2oOyUXzMpiIm2s592eWPL79bx/4MQwV1bDb7kfNy1WIxIIkxgBw==-6cYfazCCSgeSbljap8R49K53vc4CsFS+zDWh39pmg3A=-:yWVw%,gNZpY24NI';
config.merchantAccount = 'ChonghowECOM';
const client = new Client({ config });
client.setEnvironment('TEST');
const checkout = new CheckoutAPI(client);

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Reservation.name)
        private reservationModel: Model<Reservation>,
    ) {}
    async get(amount) {
        console.log(amount);
        return await checkout
            .paymentMethods({
                merchantAccount: config.merchantAccount,
                countryCode: 'MY',
                allowedPaymentMethods: ['grabpay_MY'],
                amount: { currency: 'MYR', value: amount * 100 },
                channel: 'Web',
                shopperLocale: 'en-US',
            })
            .then(res => res);
    }

    update(payload) {
        console.log(payload.homestay);
        let date = new Date();
        let timestamp = date.getTime();
        return checkout
            .payments({
                amount: {
                    currency: 'MYR',
                    value: payload.homestay.amount * 100,
                },
                paymentMethod: {
                    type: 'grabpay_MY',
                },
                reference: `${payload.homestay.id}_${timestamp}`,
                merchantAccount: config.merchantAccount,
                returnUrl: `http://localhost:3000/payment/detail?id=${payload.homestay.id}`,
            })
            .then(res => res);
    }
    async detail(payload) {
        const detail = await checkout
            .paymentsDetails({ details: { payload: payload.payload } })
            .then(res => res);

        if (detail.resultCode === 'Authorised') {
            // update database
            const update = this.reservationModel.findByIdAndUpdate(
                payload.id,
                { isPaid: true },
                function(err, result) {
                    if (err) {
                        err;
                    } else {
                        result;
                    }
                },
            );
        }
    }
}
