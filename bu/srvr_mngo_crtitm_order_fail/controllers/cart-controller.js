const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const CartItems = require('../models/cart-items');
const cartLogic = require('../business-logic/cart-logic');

// add cart: POST http://localhost:3000/api/cart/add-cart
router.post('/add-cart', async (request, response) => {
    const cart = new Cart(request.body);
    try {
        cart.date = new Date();
        const addedCart = await cartLogic.addCart(cart);
        response.json(addedCart);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/add-item', async (request, response) => {
    try {
        const item = new CartItems(request.body);
        // Check if there's an old cart with the same product for this user: 
        const oldCart = await cartLogic.searchCartForItem(item);
        if (oldCart.length > 0) {
            throw ("this product is already in this cart")
        }
        // price calculation moved to client-side.
        const addedItem = await cartLogic.addCartItems(item);
        response.json(addedItem);
    } catch (error) {
        response.status(500).send(error);
    }
});

// get cartID - old GET http://localhost:3000/api/cart/user-cart/5edf8fc93e7ddb3c5ad0ef46
router.get('/user-cart/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const oldCart = await cartLogic.getOldCart(id);
        const oldItems = await cartLogic.getUserItems(oldCart[0]._id);
        response.json(oldItems);
    } catch (error) {
        response.status(500).send(error);
    }
});

// remove item from user cart: DELETE http://localhost:3000/api/cart/remove-item/5edcedebd529bb535cf84d4d
router.delete('/remove-item/:id', async (request, response) => {
    const itemID = request.params.id;
    try {
        await cartLogic.deleteItemFromCart(itemID);
        response.sendStatus(204);
    
    } catch (error) {
        response.status(500).send(error);
    }
});

// remove all items from user cart: DELETE http://localhost:3000/api/cart/remove-item/5edcedebd529bb535cf84d4d
router.delete('/remove-items/:cartid', async (request, response) => {
    const cartId = request.params.cartid;
    try {
        await cartLogic.deleteAllItemsFromCart(cartId);
        response.sendStatus(204);
    
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;