const e = require("express");
const {User} = require("../models/UserModel");
const { use } = require("../routes/employeeRoutes");
// const { use } = require("../routes/thamindu");

var users = new Map();
var user = new User();

class UserController{
    async setLastActiveTime(emp_ID){
        const status = await user.setLastActiveTime(emp_ID)
    }

    async login(req){ 
        const username = req.body.username
        const password = req.body.password 
        if(username && password){
            const status = await user.login(username,password);
            return(status);
        }
        return(null)
    }

    async getType(employee_ID){
        const status = await user.getType(employee_ID)
        return (status);
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
        return({message:"incomplete request"})
    }

    async viewRequest(username){
        const status = await user.viewRequest(username)
        return status
    }

    async requestValidation(emp_ID,date,decision,type,req_No){
        const status = await user.requestValidation(emp_ID,date,decision,type,req_No)
        return status
    }

    async checkRecord(emp_ID){
        const status = await user.checkRecord(emp_ID)
        return status
    }

    async getEmergancyDetail(emp_ID){
        const status = await user.getEmergancyDetail(emp_ID)
        return status
    }

    async setAccessLevel(emp_ID,level){
        const status = await user.setAccessLevel(emp_ID,level)
        return status
    }


    async editEmployee(field,value,emp_ID){
        if(field && value){
            const status = await user.edidEmployee(field,value,emp_ID)
            return (status)
        }
        return (null)
    }

    async editEmergancy(field,value,emp_ID){
        if(field && value){
            const status = await user.edidEmergancy(field,value,emp_ID)
            return (status)
        }
        return (null)
    }

    async setLastActiveTime(thisUser){
        const emp_ID = thisUser
        const status = await user.setLastActiveTime(emp_ID)
        return(status)
    }
    
    async addEmployee(data){
        await user.addEmployee(data)  // data is a Json object
    }

    async viewLeaveStatus(emp_ID){
        const status = await user.viewLeaveStatus(emp_ID)
        return status;
    }

    async getLastTime(emp_ID){
        const status = await user.getLastTime(emp_ID)
        return status
    }

    async createAccount(req){
        const username = req.body.username
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        const accessLevel = req.body.accessLevel
        if(username && password && confirmPassword && accessLevel){
            if(password == confirmPassword){
                const status = await user.createAccount(username,password,accessLevel)
                return (status)
            }else{
                return ({message:"confirm password is not matched"})
            }
        }else{
            return ({message:"fields connot be blank"})
        }
    }

    async deleteAccount(username){
        if(username){
            const status = await user.deleteAccount(username)
            return (status)
        }else{
            return ({message:"please enter a username"})
        }
    }

    async deletehrAccount(username){
        if(username){
            const status = await user.deletehrAccount(username)
            return (status)
        }else{
            return ("please enter a username")
        }
    }

    async changePassword(req){
        const username = req.user.username
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        const confirmPassword = req.body.confirmPassword
        if(username && oldPassword && confirmPassword && newPassword){
            if(newPassword == confirmPassword){
                const status = await user.changePassword(username,oldPassword,newPassword)
                return (status)
            }else{
                return ({message:"Confirm password is not matched"})
            }
        }else{
            return ({message:"Fields connot be blank"})
        }
    }
}

module.exports = {UserController}

