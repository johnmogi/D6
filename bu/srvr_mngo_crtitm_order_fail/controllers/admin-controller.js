const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Category = require('../models/category');
const adminLogic = require('../business-logic/admin-logic');
const fs = require('fs');

// add item: POST http://localhost:3000/api/admin/add
router.post('/add', async (request, response) => {
    try {
        const item = new Item(request.body);
      
         const addedItem = await adminLogic.addItem(item);
         response.json(addedItem);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

// edit item (admin)
// add item: PUT http://localhost:3000/api/admin/edit-item

router.put('/edit-item', async (request, response) => {
    try {
        const oldItem = new Item(request.body);

        const editedItem = await adminLogic.editItem(oldItem);
        console.log(editedItem)
        if (oldItem === null) { response.sendStatus(404); return; }
        response.json(editedItem);
    } catch (error) {
        response.status(500).send(error);
    }
});

// delete item (admin)
router.delete('/delete/:id', async (request, response) => {
    try {
        const _id = request.params.id;
         await adminLogic.deleteItem(_id);
         response.sendStatus(204);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

// add category: POST http://localhost:3000/api/admin/add-cat
router.post('/add-cat', async (request, response) => {
    try {
        const cat = new Category(request.body);
         const addedCat = await adminLogic.addCategory(cat);
         response.json(addedCat);
    } catch (error) {
        response.status(500).send(error.message);
    }
});
module.exports = router;
