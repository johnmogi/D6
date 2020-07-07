const mongoose = require("mongoose");



const ItemSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    itemDescription: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 80
    },
    catID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

ItemSchema.virtual("cartItem", {
    ref: "cartItem",
    localField: "_id",
    foreignField: "itemID"
});

ItemSchema.virtual("category", {
    ref: "Category",
    localField: "catID",
    foreignField: "_id",
    justOne: true
});
const Item = mongoose.model("Item", ItemSchema, "items");

module.exports = Item; 
