const express = require('express');
const router = express.Router();
const Auth = require('../models/auth');
const authLogic = require('../business-logic/auth-logic');
const jwt = require("jsonwebtoken");
const jwtLogic = require('../helpers/jwt');     


router.post('/register', async (request, response) => {
    try {
        const auth = new Auth(request.body);

        /// --------------------
        const newUser = await authLogic.addUser(auth);
      
        //save jwt token
        const jwtToken = jwt.sign({ auth: newUser }, 'secretkey');
        newUser.password = null;
        // delete newUser.password
        console.log(newUser);
        response.json({ auth: newUser, jwtToken });
    } catch (error) {
        response.status(500).send(error);
    }
});

// http://localhost:3000/api/auth/login
router.post('/login', async (request, response) => {
    const info = request.body;
    try {   
     
        const getUser = await authLogic.login(info);
  
        console.log(JSON.stringify(getUser[0]))
        getUser[0].password = null;
        const user= getUser[0]
        const jwtToken = jwt.sign({ user }, 'secretkey');
        response.json({ user, jwtToken });
    } catch (error) {
        response.status(500).send(error.message);
    }
});


module.exports = router;
