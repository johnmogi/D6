const express = require('express');
const router = express.Router();
const authLogic = require('../business-logic/auth-logic');
const sendError = require("../helpers/send-error");

const jwt = require("jsonwebtoken");
const jwtLogic = require('../helpers/jwt');


// // count visit number 
// router.get('/visit-counter', async (request, response) => {
//     try {
//         const visit = await authLogic.getVisitNum();
//         response.json(visit);
//     } catch (error) {
//         sendError(response, error);
//     }
// });

router.post('/check-user', async (request, response) => {
    const auth = request.body;
    // console.log(auth)
    try {
        const checkUserName = await authLogic.lookUpUser(auth.username_email);
        // console.log(checkUserName.length)
        if (checkUserName.length > 0) {
            response.json({ message: "Email already exists", email: "taken" });
            return;
        }
        const checkId = await authLogic.lookUpID(auth.id);
        if (checkId.length > 0) {
            response.json({ message: "ID already exists", id: "taken" });
            return;
        }

        response.json({ message: "permission granted", user: "ok" });
    } catch (error) {
        response.status(403).send(error.message);
        // sendError(response, error);
    }
});


router.post('/register', async (request, response) => {
    const auth = request.body;
    if (!auth.firstName || !auth.lastName || !auth.city || !auth.street) {
        response.json({ message: "one of the fields is missing, please try again..." })
    }

    try {
        //check if user & email exists
        const checkUserName = await authLogic.lookUpUser(auth.userName);
        const checkId = await authLogic.lookUpID(auth.id);
        if (checkUserName.length !== 0) { throw "Email already exists" }
        if (checkId.length !== 0) { throw "ID already exists" }

        const newUser = await authLogic.addUser(auth);
        console.log("added?:", newUser)
        delete newUser.password
        //save jwt token
        const jwtToken = jwt.sign({ auth: newUser }, 'secretkey');
        response.json({ auth: newUser, jwtToken });
    } catch (error) {
        sendError(response, error);
    }
});

router.post('/login', async (request, response) => {
    try {
        const info = request.body;
// console.log(info)
        const getUser = await authLogic.login(info);
        if (getUser.length === 0) {
            response.json('Incorrect UserName or Password');
            return;
        }
        const user = getUser[0];
        const jwtToken = jwt.sign({ user }, 'secretkey');
        response.json({ user, jwtToken });
    } catch (error) {
        sendError(response, error);
    }
});


router.patch('/up-visit/:id', async (request, response) => {
    const userID = +request.params.id
    try {
        await authLogic.countUpUser(userID);
        response.json('up number of visits for this user counter');
        return;
    } catch (error) {
        sendError(response, error);
    }
});

router.get('/keep-user', jwtLogic.verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json(err);
        } else {
            res.json(authData);
        }
    });
});

// user - wellcome
module.exports = router;
