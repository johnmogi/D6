const dal = require("../data-access-layer/dal");

async function getAllOrders() {
    const sql = `SELECT * FROM clientOrder`;
    const orders = await dal.executeAsync(sql);
    return orders;
}
async function getOneOrder(id) {
    const sql = `SELECT * FROM clientOrder where orderID = ${id}`;
    const order = await dal.executeAsync(sql);
    return order;
}
// (clientID,cartID,subTotal,shippingCity,shippingStreet,shippingDate,orderTime,paymentDigits)
async function addOrder(order) {
    console.log(order)
    const sql = `INSERT INTO clientOrder VALUES (DEFAULT,  ?, ? ,? ,? ,? ,? ,? ,?)`;
    //  const newCart = await dal.executeAsync(sql);
    const newCart = await dal.executeAsync(sql, [
        order.clientID,
        order.cartID,
        order.subTotal,
        order.shippingCity,
        order.shippingStreet,
        order.shippingDate,
        order.orderTime,
        order.paymentDigits
    ]);
    return newCart;
}

module.exports = {
    getAllOrders,
    getOneOrder,
    addOrder
}

// INSERT INTO `clientOrder` (`orderID`, `clientID`, `cartID`, `subTotal`, `shippingCity`, `shippingStreet`, `shippingDate`, `orderTime`, `paymentDigits`) VALUES (NULL, '23', '6', '1000', 'Barcelona', 'a', '2020-06-16', '2020-06-23', '1234');
