const dal = require("../data-access-layer/dal");

async function getAllProducts() {
    const sql = `SELECT * FROM products`;
    const products = await dal.executeAsync(sql);
    return products;
}

async function getOneProduct(id) {
    const sql = `SELECT * FROM products where productID = ${id}`;
    const product = await dal.executeAsync(sql);
    return product;
}


async function getAllCats() {
    const sql = `SELECT * FROM categories`;
    const cats = await dal.executeAsync(sql);
    return cats;
}



module.exports = {
    getAllProducts,
    getOneProduct,
    getAllCats,
    
    // searchProduct
}

// const sql = `SELECT vacationID,description, destination, picFileName, DATE_FORMAT(startDate, "%m/%d/%Y") as startDate, DATE_FORMAT(endDate, "%m/%d/%Y") as endDate, price FROM vacations`;
