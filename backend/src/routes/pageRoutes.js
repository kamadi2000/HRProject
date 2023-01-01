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
    res,sendFile(path.join(initialPath,"Admin/admin.html"));
})



module.exports = router;