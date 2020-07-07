const Cart = require('../models/cart')
const CartItems = require('../models/cart-items')

function addCart(cart) {
    return cart.save();
}

function addCartItems(cartItems) {
    return cartItems.save();
}

function getOldCart(userId) {
    return Cart.find({ userId: userId }).exec();
}

function searchCartForItem(cart) {
    return CartItems.find({ productId: cart.productId }).exec();
}

function getUserItems(cartId) {
    return CartItems.find({ cartId: cartId }).exec();
}
function deleteItemFromCart(_id) {
    return CartItems.deleteOne({ productId: _id });
}

function deleteAllItemsFromCart(cartId) {
    return CartItems.deleteMany({cartId });
}

function deleteCart(cartId) {
    return Cart.deleteOne({cartId });
}




module.exports = {
    addCart,
    addCartItems,
    getOldCart,
    searchCartForItem,
    getUserItems,
    deleteItemFromCart,
    deleteAllItemsFromCart,
    deleteCart
}

