export class OrderModel {
    public constructor(
    public _id?: String,
    public subTotal?: Number,
    public shippingCity?: String,
    public shippingStreet?: String,
    public shippingDate?: String,
    public paymentDigits?: Number,
    public orderId?: String,
    public orderTime?: Date
    ) {
    }
    }
