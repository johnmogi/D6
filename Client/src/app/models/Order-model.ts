export class OrderModel {
    public constructor(
    public orderId?: String,
    public subTotal?: Number,
    public shippingCity?: String,
    public shippingStreet?: String,
    public shippingDate?: String,
    public paymentDigits?: Number,
    public orderTime?: Date
    ) {
    }
    }
