const {executeSQL} = require("../database/database");
const connection = require("../database/database")
const bcrypt = require("bcryptjs");



class User{
    async deleteMistakenData(username){
        try{
            await executeSQL(`DELETE FROM employment_detail WHERE emp_ID = ?`,[username])
            await executeSQL(`DELETE FROM employee_phone_number WHERE emp_ID = ?`,[username])
            await executeSQL(`DELETE FROM emergency_detail WHERE emp_ID = ?`,[username])
            await executeSQL(`DELETE FROM supervise WHERE emp_ID = ?`,[username])
            await executeSQL(`DELETE FROM leave_count WHERE emp_ID = ?`,[username])
            await executeSQL(`DELETE FROM employee WHERE ID = ?`,[username])
        }catch(e){
            console.log(e)
        }
    }

    async setLastActiveTime(emp_ID){
        try{
            await executeSQL(`
                UPDATE session_detail
                SET last_update = NOW()
                WHERE emp_ID = ?
            `,[emp_ID])
            return("last time updated")
        }catch(e){
            console.log(e)
            return(null)
        }
    }
    async login(username,password){
        try{
            var Credential = await executeSQL(`SELECT * FROM user WHERE employee_ID = ?`,[username])
            if(Credential){
                const status = await bcrypt.compare(password,Credential[0].password)
                if (status) {
                    const userdata = await executeSQL(`SELECT employee_ID,access_level FROM user WHERE employee_ID = ?`,[username])
                    return userdata
                }else{
                    console.log("password is invalid")
                    return null
                }
            }else{
                console.log("username is invalid")
                return null
            }
        }catch(e){
            console.log(e)
        }
    }

    async getType(employee_ID){
        try{
            const Credential = await executeSQL(`SELECT type FROM employment_detail WHERE emp_ID = ?`,[employee_ID])
            if(Credential){
                return Credential[0].type
            }
            return null
        }catch(e){
            console.log(e)
        }
    }

    async getToken(refreshtoken){
        try{
            const Credential = await  executeSQL(`SELECT * FROM session_detail WHERE token = ?`,[refreshtoken])
            if(Credential){  
                return (Credential[0].token)
            }
            return (null)
        }catch(e){
            console.log(e)
        }
    }

    async storeToken(refreshtoken,username){
        const token = refreshtoken;
        try{
            const status = await  executeSQL(`SELECT * FROM session_detail WHERE emp_ID = ?`,[username])
            if(status){
                await executeSQL(`DELETE FROM session_detail WHERE emp_ID = ?`,[username]);
            }
            await executeSQL(`INSERT INTO session_detail value(?,?, NOW())`,[username,token])
        }catch(e){

        }
    }

    async deleteToken(refreshtoken){
        try{
            const Credential = await  executeSQL(`SELECT * FROM session_detail WHERE token = ?`,[refreshtoken])
            if(Credential){  
                await executeSQL(`DELETE FROM session_detail WHERE token = ?`,[refreshtoken]);
                return ("sucssesfully logged out")
            }
            return ("already logged out")
        }catch(e){
            console.log(e)
        }
    }

    async getLeaveCount(username){
        try{
            const Credential = await executeSQL(`SELECT * FROM leave_count WHERE emp_ID = ?`,[username])
            return Credential
        }catch(e){
            console.log(e)
            return null
        }
    }

    async applyLeave(emp_ID,reason,leave_type,date,leave_status){
        try{
            const leaveCount = await executeSQL(`SELECT ${leave_type}_count FROM leave_count WHERE emp_ID = ?`,[emp_ID])
            const leaveType = `${leave_type}_count`
            if (leaveCount[0][leaveType] > 0){
                await executeSQL(`INSERT INTO leave_detail (emp_ID,reason,leave_type,leave_date,status) VALUES (?,?,?,?,?)`,[emp_ID,reason,leave_type,date,leave_status])
                return ("request was successfully sent")
            }else{
                return(`you have no ${leave_type} type leaves`)
            }
        }catch(e){
            console.log(e)
            return null
        }
    }

    async viewRequest(username){
        try{
            const Credential = await executeSQL(
                `SELECT * FROM leave_view JOIN supervise USING (emp_ID) WHERE sup_ID = ? AND status = 'pending'`,[username])
            if(Credential){
                return Credential
            }
            return null
        }catch(e){
            console.log(e)
        }
    }

    async requestValidation(emp_ID,date,decision,type, req_No){
        
        try{
            await executeSQL(`
                UPDATE leave_detail
                SET status = ?
                WHERE req_No = ? `,
                [decision,req_No])
            
            return ("successfully validated")
        }catch(e){
            console.log(e)
        }
    }

    async checkRecord(emp_ID){
        try{
            const Credential = await executeSQL(`
                SELECT * 
                FROM employee e
                JOIN employment_detail ed ON ed.emp_ID = e.ID
                WHERE ID = ?`,[emp_ID])
            
            const phoneNumbers = await executeSQL(`SELECT phone_number FROM employee_phone_number WHERE emp_ID = ?`,[emp_ID])
            const emergancyDetail = await executeSQL(`SELECT * FROM emergency_detail WHERE emp_ID = ?`,[emp_ID])
            let phone_number = []
            for(let k in phoneNumbers){
                phone_number.push(phoneNumbers[k].phone_number)
            }
            const data = { data:Credential[0] ,phone_numbers:phone_number,emergancy:emergancyDetail[0]}
            if(Credential && phoneNumbers){
                return (data)
            }else{
                return (null)
            }
        }catch(e){
            console.log(e)
        }
    }


    async getEmergancyDetail(emp_ID){
        try{
            const Credential = await executeSQL(`SELECT * FROM emergency_detail WHERE emp_ID = ?`,[emp_ID])
            if(Credential){
                return(Credential[0])
            }else{
                return(null)
            }
        }catch(e){
            console.log(e)
        }
    }

    async setAccessLevel(emp_ID,level){
        try{
            await executeSQL(`
                UPDATE user
                SET access_level = ?
                WHERE employee_ID = ?`,[level,emp_ID])

            return("successfully updated")
        }catch(e){
            console.log(e)
            return (null)
        }
    }
    
    async addEmployee(data){  // data is a JSON object
        try {
            const Credential = await executeSQL(`SELECT * FROM employee WHERE ID = ?`,[data.id])
            const isSupervisor = await executeSQL(`SELECT EXISTS(SELECT 1 FROM employment_detail WHERE supervisor = '1' AND emp_ID = ?) AS available`,[data.superviseID])
            if(Credential){
                return ("employee ID is already exist")
            }else{
                await executeSQL(
                    `
                    INSERT INTO employee (
                        ID, 
                        first_name, 
                        middle_name, 
                        last_name, 
                        date_of_birth, 
                        gender, 
                        marital_status, 
                        road, 
                        city, 
                        country)
                    VALUE (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?)`,[data.id,data.firstName,data.middleName,data.lastName,data.dateOfBirth,data.gender,data.maritalStatus,data.road,data.city,data.country])
                
                await executeSQL(`
                    INSERT INTO employment_detail (
                        emp_ID,
                        job_title,
                        pay_grade,
                        employeement_status,
                        working_time,
                        department,
                        branch_ID,
                        supervisor,
                        type
                    )
    
                    VALUE (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )`
                ,[data.id,data.jobTitle,data.paygrade,data.employeementStatus,data.workingTime,data.department,data.branchID,data.supervisor,data.type]);
                await this.addPhoneNumber(data)
                await executeSQL(`INSERT INTO emergency_detail VALUE (?,?,?,?,?)`,[data.id,data.emg_first_name,data.emg_last_name,data.relationship,data.emg_phone_number])
                if(isSupervisor[0].available){
                    await executeSQL(`INSERT INTO supervise VALUE (?,?)`,[data.id,data.superviseID])
                    return ("successfully added")
                }else{
                    return ("Supervisor id is wrong")
                }

            }

        } catch (error) {
            console.log(error)
        }
    }

    async addPhoneNumber(data){
        try {
            await executeSQL(`INSERT INTO employee_phone_number (emp_ID, phone_number) VALUE (?, ?)`,[data.id,data.phoneNumber])
        } catch (error) {
            console.log(error)
        }
    }

    async viewLeaveStatus(emp_ID){
        try{
            const Credential = await executeSQL(`
                SELECT
                    reason,
                    leave_type,
                    leave_date,
                    status
                FROM leave_detail
                WHERE emp_ID = ?
            `,[emp_ID])
            return Credential

        }catch(e){
            console.log(e)
        }
    }

    async getLastTime(emp_ID){
        try{
            const Credential = await executeSQL(`SELECT last_update FROM session_detail WHERE emp_ID = ?`,[emp_ID])
            return Credential[0].last_update
        }catch(e){
            console.log(e)
            return null
        }
    }

    async createAccount(username,password,accessLevel){
        try{
            const Credential = await executeSQL('SELECT * FROM user WHERE employee_ID = ?',[username])
            if(Credential){
                return ({message:"This username already exists"})
            }else{
                const salt = await bcrypt.genSalt(10);
                const userpassword = await bcrypt.hash(password, salt)
                const canInsert = await executeSQL(`SELECT * FROM employee WHERE ID = ?`,[username])
                if(canInsert){
                    await executeSQL(`INSERT INTO user values (?,?,?)`,[username,userpassword,accessLevel])
                    return ({message:"Successfully created"})
                }else{
                    console.log('hiii')
                    return ({message:"invalid username"})
                }
            }
        }catch(e){
            console.log(e)
            return (null)
        }
    }

    async deleteAccount(username){
        try{
            const Credential = await executeSQL('SELECT * FROM user WHERE employee_ID = ?',[username])
            const type = await executeSQL('SELECT type FROM employment_detail WHERE emp_ID = ?',[username])
            if(["Supervisor","General"].includes(type[0].type)){
                if(Credential ){
                    await executeSQL(`DELETE FROM user WHERE employee_ID = ?`,[username])
                    return ({message : "successfully deleted"})
                }else{
                    return({message:"there is no account on that username"})
                }
            }else{
                return({message:"you have no permission to delete this account"})
            }
        }catch(e){
            console.log(e)
            return(null)
        }
    }

    async deletehrAccount(username){
        try{
            const Credential = await executeSQL('SELECT * FROM user WHERE employee_ID = ?',[username])
            const type = await executeSQL('SELECT type FROM employment_detail WHERE emp_ID = ?',[username])
            if("HRManager" == type[0].type){
                if(Credential ){
                    await executeSQL(`DELETE FROM user WHERE employee_ID = ?`,[username])
                    return ({message:"Successfully deleted"})
                }else{
                    return({message:"There is no account on that username"})
                }
            }else{
                return({message:"You have no permission to delete this account"})
            }
        }catch(e){
            console.log(e)
            return(null)
        }
    }

    async edidEmployee(field,value,emp_ID){
        try{
            await executeSQL(`
                UPDATE employee
                SET ${field} = ?
                WHERE ID = ?`,[value,emp_ID])
            return ({messaage:"successfully updated"})
        }catch(e){
            console.log(e)
            return (null)
        }
    }

    async edidEmployment(field,value,emp_ID){
        try{
            await executeSQL(`
                UPDATE employment_detail
                SET ${field} = ?
                WHERE emp_ID = ?`,[value,emp_ID])
            return ({message:"successfully updated"})
        }catch(e){
            console.log(e)
            return (null)
        }
    }

    async edidEmergancy (field,value,emp_ID){
        try{
            await executeSQL(`
                UPDATE emergency_detail
                SET ${field} = ?
                WHERE emp_ID = ?`,[value,emp_ID])
            return ({message:"successfully updated"})
        }catch(e){
            console.log(e)
            return (null)
        }
    }

    async changePassword(username,oldPassword,newPassword){
        try{
            var Credential = await executeSQL(`SELECT * FROM user WHERE employee_ID = ?`,[username])
            if(Credential){
                const status = await bcrypt.compare(oldPassword,Credential[0].password)
                if(status){
                    const salt = await bcrypt.genSalt(10);
                    const userpassword = await bcrypt.hash(newPassword, salt)
                    await executeSQL(`
                        UPDATE user
                        SET password = ?
                        WHERE employee_ID = ?`,[userpassword,username])
                    return ({message:"Password is successfully changed"})
                }
            }else{
                return ({message:"This user name is invalid"})
            }
        }catch(e){
            console.log(e)
        }
    }
    async addCustomField(emp_ID,custom_field,value){  
        try {
            await executeSQL(`INSERT INTO custom (emp_ID,custom_field,value)VALUE (?,?,?)`,[emp_ID,custom_field,value])
        }catch (error) {
            console.log(error)
        }
    }

}


module.exports = {User}