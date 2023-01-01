const {User} = require("../models/UserModel");

var users = new Map();
var user = new User();

class UserController{
    async login(req){ 
        const username = req.body.username
        const password = req.body.password 
        if(username && password){
            const status = await user.login(username,password);
            return(status);
        }
        return(null)
    }

    async getToken(refreshtoken){
        const status = await user.getToken(refreshtoken)
        return (status);
    }

    async storeToken(refreshtoken,username){
        await user.storeToken(refreshtoken,username)
    }

    async deleteToken(refreshtoken){
        const status = await user.deleteToken(refreshtoken);
        return(status)
    }

    async getLeaveCount(username){
        const status = await user.getLeaveCount(username)
        return status
    }

    async applyLeave(req){
        const emp_ID = req.user.username
        const reason = req.body.reason
        const leave_type  = req.body.leave_type
        const date  = req.body.date
        const leave_status  = "pending"
        if(emp_ID && reason && leave_type && date && leave_status){
            const status = await user.applyLeave(emp_ID,reason,leave_type,date,leave_status)
            return status
        }
        return("incomplete request")
    }

}

module.exports = {UserController}

