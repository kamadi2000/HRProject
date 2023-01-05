const { Router } = require('express');
const express = require('express');
const path = require('path')

const router = Router()

let initialPath = path.join(__dirname,"../../../public");
router.use(express.static(initialPath));
router.get('/loginPage', (req, res) => {
    res.sendFile(path.join(initialPath,"LoginPage/LoginScreen.html"));
})

router.get('/AdminPage', (req, res)=>{
    res.sendFile(path.join(initialPath,"Admin/admin.html"));
})

router.get('/generalUser', (req, res)=>{
    res.sendFile(path.join(initialPath,"General user/generalUser.html"));
})

router.get('/HRmanager', (req, res)=>{
    res.sendFile(path.join(initialPath,"HR Manager/HRmanager.html"));
})

router.get('/form', (req, res)=>{
    res.sendFile(path.join(initialPath,"MakeForm/Add_Employee_form.html"));
})

router.get('/manager', (req, res)=>{
    res.sendFile(path.join(initialPath,"Manager/manager.html"));
})

router.get('/supervisor', (req, res)=>{
    res.sendFile(path.join(initialPath,"Supervisor/supervisor.html"));
})

router.get('/viewInfo',(req, res)=>{
    res.sendFile(path.join(initialPath,"ViewInfo/viewInfo.html"));
})

router.get('/leaveStatus',(req, res)=>{
    res.sendFile(path.join(initialPath,"General User/LeaveInfo.html"));
})

router.get('/infoRender',(req,res)=>{
    res.sendFile(path.join(initialPath,"HR Manager/infoRender.html"));
    
})









module.exports = router;