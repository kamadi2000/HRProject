const express = require('express');
const {config} = require('../database/config')
const {auth} = require('../middleware/auth')
require('dotenv').config();

const {ResponseHandler} = require("../controllers/ResponseController");
const {UserController} = require("../controllers/UserController");

const router = express.Router();

const controller = new UserController();

router.get('/viewcount',auth,(req,res)=>{
    
})