const dal = require('../data-access-layer/dal')
const cryptography = require('../helpers/cryptography');



// async function getVisitNum(user) {
//     const sql = `SELECT username_email FROM users WHERE username_email = ?`
//     const user = await dal.executeAsync(sql, [info]);
//     return user;
// }

async function addUser(user) {
    user.password = cryptography.hash(user.password);
     const sql = `INSERT INTO users (firstName, lastName, username_email, password, city , street, id, isAdmin, firstVisit )VALUES('${user.firstName}', '${user.lastName}', '${user.username_email}', '${user.password}', '${user.city}', '${user.street}', ${user.id} ,0, 0)`
     //const sql = 'INSERT INTO users (firstName, lastName, username_email, password, city , street, id, isAdmin, firstVisit ) VALUES(DEFAULT,  ?, ?, ?, ?, ?, ? ,null, 0,0)'
   //await dal.executeAsync(sql, [user.firstName, user.lastName, user.username_email, user.password, user.city, user.street, user.id, user.isAdmin, user.firstVisit]);
    console.log("in", sql)
 await dal.executeAsync(sql);
    delete user.password;
    console.log(user)
    return user;
}
// INSERT INTO `users` (`userID`, `firstName`, `lastName`, `username_email`, `password`, `city`, `street`, `id`, `isAdmin`, `firstVisit`) VALUES (NULL, '9', '9', '9', '9', '9', '9', '9', '0', NULL);

async function lookUpUser(info) {
    const sql = `SELECT username_email FROM users WHERE username_email = ?`
    const user = await dal.executeAsync(sql, [info]);
    return user;
}
function lookUpID(id) {
    const sql = `SELECT * FROM users WHERE id = ?`
    const user = dal.executeAsync(sql, [id]);
    return user;
}

function login(info) {
    info.password = cryptography.hash(info.password);
    const sql = `SELECT * FROM users WHERE username_email = ? AND password = ?`
    const user = dal.executeAsync(sql, [info.username_email, info.password]);
    return user;
}
function countUpUser(id) {
    // UPDATE users SET firstVisit = firstVisit + 1 WHERE  userID = 24
    const sql = `UPDATE users SET firstVisit = firstVisit + 1 WHERE  userID = ?`
    const user = dal.executeAsync(sql, [id]);
    return user;
}


module.exports = {
    addUser,
    lookUpUser,
    lookUpID,
    login,
    countUpUser
}