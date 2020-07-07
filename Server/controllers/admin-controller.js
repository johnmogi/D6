const express = require('express');
const router = express.Router();
const fileUpload = require("express-fileupload");
const uuid = require("uuid");
router.use(fileUpload());

const fs = require("fs");

const adminLogic = require('../business-logic/admin-logic');
const sendError = require("../helpers/send-error");

// router.post('/add-product', async (request, response) => {
//     const item = request.body;
//     console.log(item)
//     try {
//         if (!request.files.image) {
//             response.status(400).send("Please Attach a file");
//             return;
//         }
//         const imageFile = request.files.image;
//       //  console.log(imageFile)
//        // console.log(request.files)
//         const extension = image.name.substr(image.name.lastIndexOf("."));
//         const fileName = uuid() + extension;
//         // image.mv("./uploads/products" + fileName);
//         image.mv('../uploads/images' + fileName);
//         item.imageUrl = randomName + extension;
//         response.send("Done.");
//         const products = await adminLogic.addProduct(item);
//         response.json(products);
//     } catch (error) {
//         sendError(response, error);
//     }
// });


router.post('/add-image', async (request, response) => {
    const item = request.body;
    console.log(item)
    try {
        if (request.files) {

            const file = request.files.imageUrl;
            const extension = file.name.substr(file.name.lastIndexOf("."));
            const newFile = uuid.v4() + extension;
            file.mv("./uploads/" + newFile);
            console.log(request.files.imageUrl.name);
            console.log(newFile)
        }
    } catch (error) {
        sendError(response, error);
    }
});

router.post('/add-product', async (request, response) => {
    const item = request.body;
    try {
        console.log(item)
        //? if no file - future error
        if (request.files) {

            const file = request.files.imageUrl;
            const extension = file.name.substr(file.name.lastIndexOf("."));
            const newFile = uuid.v4() + extension;
            file.mv("./uploads/" + newFile);
            console.log(request.files.imageUrl.name);
            console.log(newFile)
        }

        // const product = await productLogic.addProduct(item, newFile);
        const product = await productLogic.addProduct(item);
        console.log(JSON.stringify(product))
        response.json(product);
    } catch (error) {
        sendError(response, error);
    }
});

router.patch('/update-item', async (request, response) => {
    const item = request.body;
    console.log(item)
    try {
        const updateProduct = await adminLogic.editProduct(item);
        response.json(updateProduct);
    } catch (error) {
        sendError(response, error);
    }
});

module.exports = router;
