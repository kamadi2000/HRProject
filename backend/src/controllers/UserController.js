const {User} = require("../models/UserModel");
// const { use } = require("../routes/thamindu");

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
        return("incomplete request")
    }

    async viewRequest(username){
        const status = await user.viewRequest(username)
        return status
    }

    async requestValidation(emp_ID,date,decision,type){
        const status = await user.requestValidation(emp_ID,date,decision,type)
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

    async setAccessLevel(emp_ID){
        const status = await user.setAccessLevel(emp_ID)
        return status
    }


    async editPIM(req){
        const ID = req.body.ID
        const first_name = req.body.ID
        const middle_name = req.body.ID
        const last_name = req.body.ID
        const date_of_birth = req.body.ID
        const gender = req.body.ID
        const marital_status = req.body.ID
        const road = req.body.ID
        const city = req.body.ID
        const country = req.body.ID
        if(ID && first_name && last_name && date_of_birth && gender && marital_status){
            const status = await user.editPIM(ID,first_name,middle_name,last_name,date_of_birth,gender,marital_status,road,city,country)
            return (status)
        }else{
            console.log("values cannot be null")
        }    
    }

    async setLastActiveTime(thisUser){
        const emp_ID = thisUser.username
        const status = await this.setLastActiveTime(emp_ID)
        return(status)

    async addEmployee(data){
        const status = await user.addEmployeePersonalDeatails(data)
        return status;

    }
}

module.exports = {UserController}

