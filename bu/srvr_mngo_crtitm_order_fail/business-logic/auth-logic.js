const User = require('../models/auth');
const cryptography = require('../helpers/cryptography');

// Signup: 
function addUser(user) {
    user.password = cryptography.hash(user.password);
    return user.save();
}

function login(info) {
    if(info.password){
        info.password = cryptography.hash(info.password);
        console.log("gen pass");
    }
    return User.find({ 'username_email': info.username_email, 'password': info.password });
}


module.exports = {
    addUser,
    login
}