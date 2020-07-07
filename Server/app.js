require("./data-access-layer/dal");
global.config = require("./config");
const { port } = require("./config");
const { prod } = require("./config");
const cors = require("cors");
const fs = require("fs");

const express = require('express');
const fileUpload = require('express-fileupload');

// const accessHeader = require('./helpers/access');   
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

// controllers
const authController = require("./controllers/auth-controller");
const productController = require("./controllers/product-controller");
const adminController = require("./controllers/admin-controller");
const cartController = require("./controllers/cart-controller");
const orderController = require("./controllers/order-controller");


const server = express();

// server.use(cors({ origin: `http://localhost:4200`, credentials: true })); 
server.use(cors());


server.use(fileUpload());
server.use(express.json());


server.use('/api/auth', authController);
server.use('/api/products', productController);
server.use('/api/admin', adminController);
server.use('/api/cart', cartController);
server.use('/api/orders', orderController);





server.listen({ port }, () => console.log(`Listening on http://localhost:${port}`));
