const express = require('express');
const jwt = require('jsonwebtoken');
const {config} = require('../database/config')
const {authenticate} = require('../middleware/auth')
require('dotenv').config();

const {ResponseHandler} = require("../controllers/ResponseController");
const {UserController} = require("../controllers/UserController");

const router = express.Router();

const controller = new UserController();

router.post('/login', async (req,res)=>{

    const status = await controller.login(req);
    if(status){
        const type = await controller.getType(status[0].employee_ID)
        const user = {type:type,access_level:status[0].access_level, username: status[0].employee_ID}
        const accesstoken = jwt.sign(user,config.ACCESS_TOKEN_KEY,{expiresIn: '15m'});
        const refreshtoken = jwt.sign(user,config.REFRESH_TOKEN_KEY,{expiresIn: '24h'});
        await controller.storeToken(refreshtoken,status[0].employee_ID);
        if(type){
            res.status(ResponseHandler(status)).send({accesstoken,refreshtoken,type});
        }else{
            res.send(401)
        }
    }else{
        res.sendStatus(401)
    }
});

router.post('/token', async (req,res)=>{
    const refreshtoken = req.body.refreshtoken;
    if(refreshtoken==null) res.sendStatus(401);
    
    const status = await controller.getToken(refreshtoken);
    try{
        if(status){
            jwt.verify(refreshtoken,config.REFRESH_TOKEN_KEY, async (err,user)=>{
                if(err) res.sendStatus(403);
                const last_time = await controller.getLastTime(user.username)
                const oldTime = new Date(last_time).getTime()
                const newTime = new Date().getTime()
                if( newTime - oldTime < 2500000){
                    const accesstoken = jwt.sign({type:user.type,access_level:user.access_level, username: user.username},config.ACCESS_TOKEN_KEY,{expiresIn: '15m'});
                    res.status(ResponseHandler(status)).send({accesstoken});
                }else{
                    res.sendStatus(401)
                }
            })
        }else{
            res.sendStatus(403);
        }
    }catch(e){
        console.log(e)
    }
})

router.delete('/logout',async (req,res)=>{
    status = await controller.deleteToken(req.body.refreshtoken)
    res.status(204).send({status});
})

module.exports = router;