const express = require('express');
const {authenticate} = require('../middleware/auth')
require('dotenv').config();

const { reportController } = require('../controllers/reportController');

const router = express.Router();

const controller = new reportController();

router.post('/reportemployee',authenticate, async (req,res)=>{
    const result = await controller.getEmployeeReport(req.body.department_name)
    res.send(result)
})

router.post('/reportleave',authenticate, async (req,res)=>{
    await controller.createView();
    const result = await controller.getLeaveReport(req.body.periodBegin,req.body.periodEnd)
    res.send(result)
})
router.post('/reportemployee/jobtitle',authenticate, async (req,res)=>{
    await controller.createView();
    const result = await controller.getEmpReportJobtitle(req.body.job_title)
    res.send(result)
})
router.post('/reportemployee/department',authenticate, async (req,res)=>{
    await controller.createView();
    const result = await controller.getEmpReportDepartment(req.body.department_name)
    res.send(result)
})
router.post('/reportemployee/paygrade',authenticate, async (req,res)=>{
    await controller.createView();
    const result = await controller.getEmpReportPaygrade(req.body.paygrade)
    res.send(result)
})
module.exports = router;