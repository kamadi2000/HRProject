const express = require('express');
const {authenticate , accessAuthorization} = require('../middleware/auth')
require('dotenv').config();

const {UserController} = require("../controllers/UserController");

const router = express.Router();

const controller = new UserController();

router.post('/addEmployee', authenticate, accessAuthorization(["HRManager"]), async (req, res) => {
    const status = await controller.addEmployee(req.body)
    res.send({massege : status})
})

router.post('/addHr', authenticate, accessAuthorization(["Admin"]), async (req, res) => {
    const status = await controller.addEmployee(req.body)
    res.send({status})
})

module.exports = router;