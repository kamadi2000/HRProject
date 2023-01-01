
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
            await executeSQL(`INSERT INTO leave_detail (emp_ID,reason,leave_type,date,status) value("${emp_ID}","${reason}","${leave_type}","${date}","${leave_status}")`,[])
            return ("request was successfully sent")
        }catch(e){
            console.log(e)
            return null
        }
    }

    async editEmergancy(){
        console.log("succsusfully edided");
    }

}

module.exports = {User}