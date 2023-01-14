const express = require('express');
const {authenticate} = require('../middleware/auth')
require('dotenv').config();

const { reportController } = require('../controllers/reportController');
const { viewController } = require('../controllers/ViewController');
const {UserController} = require("../controllers/UserController");


const router = express.Router();

const Ucontroller = new UserController();
const controller = new reportController();
const controllerView = new viewController();

router.post('/reportemployee',authenticate, async (req,res)=>{
    const result = await controller.getEmployeeReport(req.body.department_name)
    await Ucontroller.setLastActiveTime(req.user.username)
    res.send(result)
})

router.post('/reportleave',authenticate,accessAuthorization(["Admin","HRManager"]), async (req,res)=>{
    await controllerView.createView();
    const result = await controller.getLeaveReport(req.body.periodBegin,req.body.periodEnd)
    await Ucontroller.setLastActiveTime(req.user.username)
    res.send(result)
})
router.post('/reportemployee/jobtitle',authenticate,accessAuthorization(["Admin","HRManager"]), async (req,res)=>{
    await controllerView.createView();
    const result = await controller.getEmpReportJobtitle(req.body.job_title)
    await Ucontroller.setLastActiveTime(req.user.username)
    res.send(result)
})
router.post('/reportemployee/department',authenticate,accessAuthorization(["Admin","HRManager"]), async (req,res)=>{
    await controllerView.createView();
    const result = await controller.getEmpReportDepartment(req.body.department_name)
    await Ucontroller.setLastActiveTime(req.user.username)
    res.send(result)
})
router.post('/reportemployee/paygrade',authenticate,accessAuthorization(["Admin","HRManager"]), async (req,res)=>{
    await controllerView.createView();
    const result = await controller.getEmpReportPaygrade(req.body.pay_grade)
    await Ucontroller.setLastActiveTime(req.user.username)
    res.send(result)
})
router.post('/reportemployee/custom',authenticate,accessAuthorization(["Admin","HRManager"]), async (req,res)=>{
    await controllerView.createView();
    const result = await controller.getEmpReportCustom(req.body.field,req.body.value)
    await Ucontroller.setLastActiveTime(req.user.username)
    res.send(result)
})
module.exports = router;