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
    if(status) {
        res.send(status)
    }else{
        res.send("No leave request")
    }
})

router.post('/requestvalidation',authenticate, async (req,res)=>{
    const emp_ID = req.body.emp_ID
    const date = req.body.date
    const decision = req.body.decision
    const type = req.body.leaveType
    const status = await controller.requestValidation(emp_ID,date,decision,type)
    res.send({status})
})

router.post('/checkrecords',authenticate, async (req,res)=>{
    const status = await controller.checkRecord(req.body.emp_ID)
    if(status){
        res.send(status)
    }else{
        res.send({massege:"Invalid epmloyee ID"})
    }
})

router.post('/emergancydetail',authenticate, async (req,res)=>{
    const status = await controller.getEmergancyDetail(req.body.emp_ID)
    if(status){
        res.send(status)
    }else{
        res.send({massege:"Invalid epmloyee ID"})
    }
})


module.exports = router;