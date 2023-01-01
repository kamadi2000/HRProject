const express = require('express');
const {authenticate} = require('../middleware/auth')
require('dotenv').config();

const {UserController} = require("../controllers/UserController");

const router = express.Router();

const controller = new UserController();

router.get('/viewleavecount',authenticate, async (req,res)=>{
    const status = await controller.getLeaveCount(req.user.username)
    res.send(status)
})

router.post('/applyleave',authenticate, async (req,res)=>{
    const status = await controller.applyLeave(req)
    res.send(status)
})

router.get('/viewrequest',authenticate, async (req,res)=>{
    const status = await controller.viewRequest(req.user.username)
    res.send(status)
})


module.exports = router;