require("./data-access-layer/dal");
global.config = require("./config");
const { port } = require("./config");

const express = require('express');
const expressSession = require("express-session");
const fileUpload = require('express-fileupload');
const cors = require("cors");
// controllers
const authController = require("./controllers/auth-controller");
const itemController = require("./controllers/item-controller");
const adminController = require("./controllers/admin-controller");
const cartController = require("./controllers/cart-controller");
const orderController = require("./controllers/order-controller");



const server = express();

// server.use(cors());
server.use(cors({ origin: "http://localhost:4200", credentials: true })); // Need those exact configuration for the session cookie to be saved at client side.

server.use(fileUpload());
server.use(express.json());
server.use(expressSession({ name: "TestLoginCookie", secret: "KittensAreCute", resave: true, saveUninitialized: false }));


server.use('/api/auth', authController);
server.use('/api/products', itemController);
server.use('/api/admin', adminController);
server.use('/api/cart', cartController);
server.use('/api/orders', orderController);



server.listen({port}, () => console.log(`Listening on http://localhost:${port}`));
