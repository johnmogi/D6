// INSERT INTO `clientOrder` (`orderID`, `clientID`, `cartID`, `subTotal`, `shippingCity`, `shippingStreet`, `shippingDate`, `orderTime`, `paymentDigits`) VALUES (NULL, '23', '1', '1000', 'Barcelona', 'square 39', '2020-06-17', '2020-06-29', '4580');

const express = require('express');
const router = express.Router();
const sendError = require("../helpers/send-error");

const orderLogic = require('../business-logic/order-logic');

//(get) http://localhost:3000/api/orders //? get all orders

router.get('/', async (request, response) => {
    try {
        const orders = await orderLogic.getAllOrders();
        response.json(orders);
    } catch (error) {
        sendError(response, error);
    }
});

//(get) http://localhost:3000/api/orders/item/:id //? get one order
router.get('/item/:id', async (request, response) => {
    // console.log("hi")
     const id = +request.params.id
     try {
         const order = await orderLogic.getOneOrder(id);
         response.json(order);
     } catch (error) {
         sendError(response, error);
     }
 });

// INSERT INTO`clientorder`(`orderID`, `clientID`, `cartID`, `subTotal`, `shippingCity`, `shippingStreet`, `shippingDate`, `orderTime`, `paymentDigits`) VALUES(NULL, '25', '9', '1000', 'Barcelona', 'a', '2020-07-01', '2020-07-01', '1234');
module.exports = router;