const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const itemsLogic = require('../business-logic/item-logic');


router.get('/', async (request, response) => {
    try {
        const items = await itemsLogic.getAllItems();
        response.json(items);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/cats', async (request, response) => {
    try {
        const cats = await itemsLogic.getAllCats();
        response.json(cats);
    } catch (error) {
        response.status(500).send(error);
    }
});
// GET http://localhost:3000/api/items/by-category/5edc83e2b1dedd683d1901c3
router.get('/by-category/:cat', async (request, response) => {
    const cat = await request.params.cat
    try {
        const items = await itemsLogic.getAllItemFromCat(cat);
        response.json(items);
    } catch (error) {
        response.status(500).send(error);
    }
});


module.exports = router;