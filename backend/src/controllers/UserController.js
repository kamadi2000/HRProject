const e = require("express");
const {User} = require("../models/UserModel");

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
        return("incomplete request")
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
        const date = new Date(status.data.date_of_birth).toLocaleDateString()
        const data = {
            "ID": status.data.ID,
            "first_name": status.data.first_name,
            "middle_name": status.data.middle_name,
            "last_name": status.data.last_name,
            "date_of_birth": date,
            "gender": status.data.gender,
            "marital_status": status.data.marital_status,
            "road": status.data.road,
            "city": status.data.city,
            "country": status.data.country,
            "job_title": status.data.job_title,
            "pay_grade": status.data.pay_grade,
            "employeement_status": status.data.employeement_status,
            "working_time": status.data.working_time,
            "department": status.data.department,
            "branch_ID": status.data.branch_ID,
            "supervisor": status.data.supervisor,
            "type": status.data.type,
            "phone_number": status.phone_numbers[0],
            "emg_first_name": status.emergancy.first_name,
            "emg_last_name": status.emergancy.last_name,
            "emg_relationship": status.emergancy.relationship,
            "emg_phone_number": status.emergancy.phone_number
        }
        return data
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

    async editEmployment(field,value,emp_ID){
        if(field && value){
            const status = await user.edidEmployment(field,value,emp_ID)
            return (status)
        }
        return (null)
    }

    async editEmergancy(field,value,emp_ID){
        if(field && value){
            const status = await user.edidEmergancy(field.slice(4),value,emp_ID)
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
        if( data.id && data.firstName && data.middleName && data.lastName && data.dateOfBirth && data.gender && data.maritalStatus && data.road && data.city && data.country && 
            data.jobTitle && data.paygrade && data.employeementStatus && data.workingTime && data.department && data.branchID && data.supervisor && data.type && 
            data.emg_first_name && data.emg_last_name && data.relationship && data.emg_phone_number && 
            data.superviseID && 
            data.phoneNumber){
                const status = await user.addEmployee(data)  // data is a Json object
                if(status == "successfully added" | status == "employee ID is already exist"){
                    return (status)
                }else{
                    await user.deleteMistakenData(data.id)
                    return (status)
                }
        }else{
            return("fields cannot be null please fill again")
        }
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
    async addCustomField(emp_ID,custom_field,value){  
        const status = await user.addCustomField(emp_ID,custom_field,value)
        return status
    }
}

module.exports = {UserController}

