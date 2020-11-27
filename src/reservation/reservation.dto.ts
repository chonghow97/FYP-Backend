export class ReservationDto{
    user: {id: string, name: string, contact: string};
    startDate: Date;
    endDate: Date;
    homestay: {id: string, name: string};
    amount: Number;
    isPaid: Boolean;
}