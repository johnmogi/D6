const jwt = require("jsonwebtoken");
npm i jsonwebtoken

 // Create new Token: 
        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });

        // Send back the token to the client: 
        response.status(201).json({ user, token });





        const express = require("express");
const authLogic = require("../business-logic/auth-logic");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (request, response) => {
    try {
        const user = await authLogic.registerAsync(request.body);

        // Create new Token: 
        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });

        // Send back the token to the client: 
        response.status(201).json({ user, token });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/login", async (request, response) => {
    try {
        const user = await authLogic.loginAsync(request.body);
        if (!user) {
            response.status(401).send("Incorrect username or password");
            return;
        }

        // Create new Token: 
        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });

        // Send back the token to the client: 
        response.json({ user, token });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
