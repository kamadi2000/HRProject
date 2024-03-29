
const {executeSQL} = require("../database/database");
const connection = require("../database/database")
const bcrypt = require("bcryptjs");

class User{
    constructor(ID, firstName, lastName, type,){
        this.username = ID;
        this.type = type;

        if(firstName){
            this.firstName = firstName;
        }else{
            this.firstName = null;
        }

        if(lastName){
            this.lastName = lastName;
        }else{
            this.lastName = null;
        }

    }

    async login(username,password){
        try{
            var Credential = await executeSQL("SELECT * FROM user WHERE employee_ID = ?",[username])
            const salt = await bcrypt.genSalt(10);
            const userpassword = await bcrypt.hash(password, salt)
            if(Credential){
                const status = await bcrypt.compare(Credential[0].password,userpassword)
                if (status) {
                    const userdata = await executeSQL("SELECT employee_ID,access_level FROM user WHERE employee_ID = ?",[username])
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
            const Credential = await executeSQL(`SELECT type FROM employment_detail WHERE emp_ID = "${employee_ID}"`,[])
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
            const Credential = await  executeSQL(`SELECT * FROM session_detail WHERE token = "${refreshtoken}"`,[])
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
            const status = await  executeSQL(`SELECT * FROM session_detail WHERE emp_ID = "${username}"`,[])
            if(status){
                await executeSQL(`DELETE FROM session_detail WHERE emp_ID = "${username}"`,[]);
            }
            await executeSQL(`INSERT INTO session_detail value("${username}","${token}", NOW())`,[])
        }catch(e){

        }
    }

    async deleteToken(refreshtoken){
        try{
            const Credential = await  executeSQL(`SELECT * FROM session_detail WHERE token = "${refreshtoken}"`,[])
            if(Credential){  
                await executeSQL(`DELETE FROM session_detail WHERE token = "${refreshtoken}"`,[]);
                return ("sucssesfully logged out")
            }
            return ("already logged out")
        }catch(e){
            console.log(e)
        }
    }

    async getLeaveCount(username){
        try{
            const Credential = await executeSQL(`SELECT * FROM leave_count WHERE emp_ID = "${username}"`,[])
            return Credential
        }catch(e){
            console.log(e)
            return null
        }
    }

    async applyLeave(emp_ID,reason,leave_type,date,leave_status){
        try{
            const leaveCount = await executeSQL(`SELECT ${leave_type}_count FROM leave_count WHERE emp_ID = "${emp_ID}"`)
            const leaveType = `${leave_type}_count`
            if (leaveCount[0][leaveType] > 0){
                await executeSQL(`INSERT INTO leave_detail (emp_ID,reason,leave_type,date,status) value("${emp_ID}","${reason}","${leave_type}","${date}","${leave_status}")`,[])
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
                `SELECT 
                    a.emp_ID, 
                    a.reason, 
                    a.date, 
                    a.leave_type, 
                    annual_count, 
                    casual_count, 
                    maternity_count, 
                    noPay_count  
                FROM leave_count 
                RIGHT JOIN (
                    SELECT 
                        s.sup_ID,
                        l.emp_ID,
                        l.reason,
                        l.leave_type,
                        l.date
                    FROM supervise s
                    RIGHT JOIN leave_detail l ON l.emp_ID = s.emp_ID 
                    WHERE sup_ID = "${username}" AND l.status = "pending") AS a ON a.emp_ID = leave_count.emp_ID`,[])
            if(Credential){
                return Credential
            }
            return null
        }catch(e){
            console.log(e)
        }
    }

    async requestValidation(emp_ID,date,decision,type){
        try{
            await executeSQL(`
                UPDATE leave_detail
                SET status = "${decision}"
                WHERE date = "${date}" AND emp_ID = "${emp_ID}"`
                )

            if(decision == "approved"){
                await executeSQL(`
                    UPDATE leave_count
                    SET ${type}_count = ${type}_count - 1
                    WHERE emp_ID = "${emp_ID}"`
                )
            }

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
                WHERE ID = "${emp_ID}"`,[])
            
            const phoneNumbers = await executeSQL(`SELECT phone_number FROM employee_phone_number WHERE emp_ID = "${emp_ID}"`,[])
            const emergancyDetail = await executeSQL(`SELECT * FROM emergency_detail WHERE emp_ID = "${emp_ID}"`,[])
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
            const Credential = await executeSQL(`SELECT * FROM emergency_detail WHERE emp_ID = "${emp_ID}"`,[])
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
                SET access_level = "${level}"
                WHERE employee_ID = "${emp_ID}"`)

            return("successfully updated")
        }catch(e){
            console.log(e)
            return (null)
        }
    }

    async addEmployeePersonalDeatails(data){  // data is a JSON object
        try {
            const Credential = await executeSQL(
                `
                INSERT INTO employee (ID, 
                                      first_name, 
                                      middle_name, 
                                      last_name, 
                                      date_of_birth, 
                                      gender, 
                                      marital_status, 
                                      road, 
                                      city, 
                                      country)
                VALUE (${data.id},
                        ${data.firstName},
                        ${data.middleName},
                        ${data.lastName},
                        ${data.dateOfBirth},
                        ${data.gender},
                        ${data.maritalStatus},
                        ${data.road},
                        ${data.city},
                        ${data.country})
                `
            );
            return Credential;
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = {User}