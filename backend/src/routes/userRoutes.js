const express = require('express');
const {authenticate , accessAuthorization , levelAuthorization} = require('../middleware/auth')
require('dotenv').config();

const {UserController} = require("../controllers/UserController");
const { executeSQL } = require('../database/database');

const router = express.Router();

const controller = new UserController();

router.get('/viewleavecount',authenticate,  accessAuthorization(["General","Supervisor","HRManager"]), async (req,res)=>{
    const status = await controller.getLeaveCount(req.user.username)
    await controller.setLastActiveTime(req.user.username)
    res.send(status)
})

router.post('/applyleave',authenticate, accessAuthorization(["General","Supervisor","HRManager"]), async (req,res)=>{
    const status = await controller.applyLeave(req)
    await controller.setLastActiveTime(req.user.username)
    res.send({massege:status})
})

router.get('/viewrequest',authenticate, accessAuthorization(["Supervisor","Admin","HRManager"]), async (req,res)=>{
    const status = await controller.viewRequest(req.user.username)
    if(status) {
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({message:"No leave request"})
    }
})

router.get('/leavestatus', authenticate,accessAuthorization(["General","Supervisor","HRManager"]), async (req,res)=>{
    const status = await controller.viewLeaveStatus(req.user.username)

    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({message:"No leave applications"})
    }
})

router.post('/requestvalidation',authenticate,accessAuthorization(["Supervisor","Admin","HRManager"]), async (req,res)=>{
    const emp_ID = req.body.emp_ID
    const date = req.body.date
    const decision = req.body.decision
    const type = req.body.leaveType
    const req_No  = req.body.req_No
    const status = await controller.requestValidation(emp_ID,date,decision,type, req_No)
    await controller.setLastActiveTime(req.user.username)
    res.send({status})
})

router.post('/checkrecords',authenticate,accessAuthorization(["Supervisor","HRManager"]), async (req,res)=>{
    const status = await controller.checkRecord(req.body.emp_ID)
    const date = new Date(status.data.date_of_birth).toLocaleDateString()
    const data = {
        "ID": status.data.ID,
        "first_name": status.data.first_name,
        "middle_name": status.data.middle_name,
        "last_name": status.data.last_name,
        "date_of_birth": date,
        "gender": status.data.gender,
        "marital_status": status.data.marital_status,
        "road": status.data.road,
        "city": status.data.city,
        "country": status.data.country,
        "job_title": status.data.job_title,
        "pay_grade": status.data.pay_grade,
        "employeement_status": status.data.employeement_status,
        "working_time": status.data.working_time,
        "department": status.data.department,
        "branch_ID": status.data.branch_ID,
        "supervisor": status.data.supervisor,
        "type": status.data.type,
        "phone_number": status.phone_numbers[0],
        "emg_first_name": status.emergancy.first_name,
        "emg_last_name": status.emergancy.last_name,
        "emg_relationship": status.emergancy.relationship,
        "emg_phone_number": status.emergancy.phone_number
    }
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(data)
    }else{
        res.send({massege:"Invalid employee ID"})
    }
})

router.post('/emergancydetail',authenticate,accessAuthorization(["Supervisor","HRManager"]), async (req,res)=>{
    const status = await controller.getEmergancyDetail(req.body.emp_ID)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({massege:"Invalid epmloyee ID"})
    }
})

router.post('/givepermission',authenticate,accessAuthorization(["Admin","HRManager"]),async (req,res)=>{
    const emp_ID = req.body.emp_ID
    const level = req.body.level
    if(level>3){
        res.send({massege:"Invalid access level"})
    }

    const status = await controller.setAccessLevel(emp_ID,level)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({massege:"Invalid employee ID"})
    }   
})

router.get('/viewpim', authenticate, async (req,res)=>{
    const status = await controller.checkRecord(req.user.username)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send("no leave applications")
    }
})

router.post('/createuseraccount',authenticate,accessAuthorization(["HRManager"]), async (req,res)=>{
    const status = await controller.createAccount(req)
   
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({message:"Cannot create accpunt check again"})
    }
})

router.post('/createhraccount',authenticate,accessAuthorization(["Admin"]), async (req,res)=>{
    const status = await controller.createAccount(req)

    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send("Cannot create check again")
    }
})

router.post('/deleteaccount',authenticate, accessAuthorization(["HRManager"]), async (req,res)=>{
    const status = await controller.deleteAccount(req.body.username)
  
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({message:"account is not deleted"})
    }
})

router.post('/deletehraccount',authenticate, accessAuthorization(["Admin"]), async (req,res)=>{
    const status = await controller.deletehrAccount(req.body.username)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send("account is not deleted")
    }
})

router.post('/editemployeebyuser',authenticate,levelAuthorization([2,3]), async (req,res)=>{
    const emp_ID = req.user.username
    const field = req.body.field
    const value = req.body.value
    const status = await controller.editEmployee(field,value,emp_ID)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({massege:"Invalid data"})
    }
})

router.post('/editemergancybyuser',authenticate,levelAuthorization([2,3]), async (req,res)=>{
    const emp_ID = req.user.username
    const field = req.body.field
    const value = req.body.value
    const status = await controller.editEmergancy(field,value,emp_ID)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({massege:"Invalid data"})
    }
})

router.post('/editemployeebyhr',authenticate,accessAuthorization(["HRManager"]), async (req,res)=>{
    const emp_ID = req.body.emp_ID
    const field = req.body.field
    const value = req.body.value
    const status = await controller.editEmployee(field,value,emp_ID)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({massege:"Invalid data"})
    }
})

router.post('/editemergancybyhr',authenticate,accessAuthorization(["HRManager"]), async (req,res)=>{
    const emp_ID = req.body.emp_ID
    const field = req.body.field
    const value = req.body.value
    const status = await controller.editEmergancy(field,value,emp_ID)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({massege:"Invalid data"})
    }
})

router.post('/changepassword',authenticate, async (req,res)=>{
    const status = await controller.changePassword(req)
    if(status){
        await controller.setLastActiveTime(req.user.username)
        res.send(status)
    }else{
        res.send({message:"Password is not changed"})
    }
})

router.post('/addEmployee', authenticate, accessAuthorization(["HRManager"]), async (req, res) => {
    const status = await controller.addEmployee(req.body)
    res.send({massege : status})
})

router.post('/addHr', authenticate, accessAuthorization(["Admin"]), async (req, res) => {
    const status = await controller.addEmployee(req.body)
    res.send({massege:status})
})

module.exports = router;