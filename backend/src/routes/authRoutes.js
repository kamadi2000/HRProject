const express = require('express');
const jwt = require('jsonwebtoken');
const {config} = require('../database/config')
const {auth} = require('../middleware/auth')
require('dotenv').config();

const {ResponseHandler} = require("../controllers/ResponseController");
const {UserController} = require("../controllers/UserController");

const router = express.Router();

const controller = new UserController();

router.get('/',auth, (req,res)=>{
    const user = req.user;
    res.json(user);
})

router.post('/login', async (req,res)=>{

    const status = await controller.login(req);
    if(status){
        const user = {type:status[0].job_tittle, username: status[0].emp_ID}
        const accesstoken = jwt.sign(user,config.ACCESS_TOKEN_KEY,{expiresIn: '10s'});
        const refreshtoken = jwt.sign(user,config.REFRESH_TOKEN_KEY,{expiresIn: '15m'});
        await controller.storeToken(refreshtoken,status[0].emp_ID);
        res.status(ResponseHandler(status)).send({accesstoken,refreshtoken});
    }else{
        res.sendStatus(401)
    }
});

router.post('/token', async (req,res)=>{
    const refreshtoken = req.body.refreshtoken;
    if(refreshtoken==null) res.sendStatus(401);
    const status = await controller.getToken(refreshtoken);
    try{
        if(status=="token not available"){
            res.sendStatus(403);
        }else{
            jwt.verify(refreshtoken,config.REFRESH_TOKEN_KEY, (err,user)=>{
                if(err) res.sendStatus(403);
                const accesstoken = jwt.sign({type:user.type, username: user.username},config.ACCESS_TOKEN_KEY,{expiresIn: '10s'});
                res.status(ResponseHandler(status)).send({accesstoken});
            })
        }
    }catch(e){
        console.log(e)
    }
})

router.delete('/logout',(req,res)=>{
    controller.deleteToken(req.body.refreshtoken)
    res.sendStatus(204);
})

module.exports = router;