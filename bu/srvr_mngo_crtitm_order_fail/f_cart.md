router.post('/add-items', async (request, response) => {

    const cart = new CartItems(request.body);
    try {
        const loadNewCart = await cartLogic.loadCart(cart);
        response.json(loadNewCart);
    } catch (error) {
        response.status(500).send(error.message);
    }
});



<!-- 
    console.log(loadNewCart.price)

        const newPrice = cart.amount * loadNewCart.price
        loadNewCart.price = newPrice -->

// // load items into cart- POST http://localhost:3000/api/cart/add-items
// router.post('/add-items', async (request, response) => {
//     const cart = request.body
   
//     try {
//         const oldCart = await cartLogic.searchCartItems(cart);
// if(oldCart[0].length != 0) {
//     const loadCart = await cartLogic.loadCart(oldCart);
//     response.json(loadCart);
// }
//         // update price and quantity if it's the same item :
//         if (oldCart[0].productId == cart.productId) {
//             const oldAmount = oldCart[0].amount;
//             const newAmount = cart.amount;
//             oldCart.amount = newAmount;
//             oldCart.price = newPrice;
//             // console.log(oldCart);
            
//             const newPrice = (oldAmount + newAmount) * oldCart[0].price;
           
//             // console.log(newPrice);
//             const loadNewCart = await cartLogic.loadCart(cart);
//             response.json(loadNewCart);
//             return;
//         }

//     } catch (error) {
//         response.status(500).send(error.message);
//     }


// });