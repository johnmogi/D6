const Order = require('../models/order');


// function getOrders() {
//     return Item.find({}).populate("categories").exec();
// }
function getOrders() {
    return Order.find({}).exec();
}
// function getAllItemFromCat(cat) {
//     return Cat.find({ _id: cat}).exec();
// } 

module.exports = {
    getOrders
}