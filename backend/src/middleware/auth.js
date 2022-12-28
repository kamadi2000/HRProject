const e = require('express');
const jwt = require('jsonwebtoken');
const {config} = require('../database/config')
require('dotenv').config();

function auth(req,res,next){
    if(req.headers.authorization && req.headers.authorization.startsWith('bearer')){
        const token = req.headers.authorization.split(' ')[1];
        if(token == null){
            res.sendStatus(401)
        }else{
            jwt.verify(token, config.ACCESS_TOKEN_KEY,(err,user)=>{
                if(err){
                    res.sendStatus(403)
                }else{
                    req.user = user;
                    next();
                }
            })
        }
    }else{
        res.sendStatus(401)
    }
}

module.exports = {auth}