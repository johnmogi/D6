const Item = require('../models/item');


function addItem(item) {
    return item.save();
}

function editItem(item) {
    console.log(item);
    return new Promise((resolve, reject) => {
        Item.updateOne({ _id: item._id }, item, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(info.n ? item : null);
        });
    });
}

function deleteItem(_id) {
    return Item.deleteOne({ _id });
}

function addCategory(cat) {
    return cat.save();
}


module.exports = {
    addItem,
    editItem,
    deleteItem,
    addCategory
}