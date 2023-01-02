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
    res.sendFile(path.join(initialPath,"MakeForm/form.html"));
})

router.get('/manager', (req, res)=>{
    res.sendFile(path.join(initialPath,"Manager/manager.html"));
})

router.get('/supervisor', (req, res)=>{
    res.sendFile(path.join(initialPath,"Supervisor/supervisor.html"));
})







module.exports = router;