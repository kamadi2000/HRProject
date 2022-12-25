const express = require('express');
const Method = require("../controllers/method");

const {ResponseHandler} = require("../controllers/ResponseController");
const {UserController} = require("../controllers/UserController");

const router = express.Router();

const controller = new UserController();

router.get('/', (req,res)=>{
    console.log("Happy");
})

router.post('/login', async (req,res)=>{
    
    const status = await controller.login(req);

    res.status(ResponseHandler(status)).send(status);
});

module.exports = router;