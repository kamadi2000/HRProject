const e = require('express');
const jwt = require('jsonwebtoken');
const {config} = require('../database/config')
require('dotenv').config();

function authenticate(req,res,next){
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

function accessAuthorization(permission){
    return (req,res,next)=>{
        const type = req.user.type
        if(permission.includes(type)){
            next()
        }else{
            return res.status(401).json("You have no permission!")
        }
    }
}

function levelAuthorization(permission){
    return (req,res,next)=>{
        const level = req.user.access_level
        if(permission.includes(level)){
            next()
        }else{
            return res.status(401).json("You have no permission!")
        }
    }
}

function bothAuthorization(typePermission, levelPermission){
    return (req,res,next)=>{
        const level = req.user.access_level
        const type = req.user.type
        if(typePermission.includes(type) && levelPermission.includes(level)){
            next()
        }else{
            return res.status(401).json("You have no permission!")
        }
    }
}


module.exports = {authenticate , accessAuthorization , levelAuthorization , bothAuthorization}