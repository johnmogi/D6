export class OrderModel {
  public constructor(
    public clientID?: Number,
    public cartID?: Number,
    public orderId?: String,
    public subTotal?: Number,
    public shippingCity?: String,
    public shippingStreet?: String,
    public shippingDate?: Date,
    public paymentDigits?: Number,
    public orderTime?: Date
  ) {}
}
