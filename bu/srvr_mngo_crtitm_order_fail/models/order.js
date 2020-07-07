const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

CartItemSchema.virtual("CartItem", {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

CartItemSchema.virtual("cart", {
    ref: "Cart",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});


const CartItem = mongoose.model("CartItem", CartItemSchema, "cart-items");

module.exports = CartItem;
