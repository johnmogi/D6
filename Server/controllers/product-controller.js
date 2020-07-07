const express = require('express');
const router = express.Router();
const sendError = require("../helpers/send-error");
const uuid = require("uuid");

const productLogic = require('../business-logic/product-logic');
const fs = require('fs');


//(get) http://localhost:3000/api/products //? get all products
router.get('/', async (request, response) => {
    try {
        const products = await productLogic.getAllProducts();
        response.json(products);
    } catch (error) {
        sendError(response, error);
    }
});
//(get) http://localhost:3000/api/products/item/:id //? get one product
router.get('/item/:id', async (request, response) => {
   // console.log("hi")
    const id = +request.params.id
    try {
        const product = await productLogic.getOneProduct(id);
        response.json(product);
    } catch (error) {
        sendError(response, error);
    }
});


// get all cats http://localhost:3000/api/products/cats
router.get('/cats', async (request, response) => {

    try {
        const cats = await productLogic.getAllCats();
        response.json(cats);
    } catch (error) {
        sendError(response, error);
    }
});




module.exports = router;