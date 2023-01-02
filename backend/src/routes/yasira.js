const express = require('express');
const {authenticate} = require('../middleware/auth')
require('dotenv').config();

const {UserController} = require("../controllers/UserController");

const router = express.Router();

const controller = new UserController();

router.get('/addEmployee', authenticate, async (req, res) => {
    const status = await controller.addEmployee(req.body)
    res.send({status})
})

module.exports = router;