
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
                    const userdata = await executeSQL("SELECT * FROM employment_detail WHERE emp_ID = ?",[username])
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
            if(Credential[0]!=null){  
                return (Credential[0].token)
            }
            return ("token not available")
        }catch(e){
            console.log(e)
        }
    }

    async storeToken(refreshtoken){
        const token = refreshtoken;
        const time = new Date();
        const lastTime = time.toISOString()
        try{
            const status = await  this.getToken(refreshtoken)
            if(status=="token not available"){
                await executeSQL(`INSERT INTO session_detail value("${token}","${lastTime}")`,[])
            }else{
                await executeSQL(`DELETE FROM session_detail WHERE token = "${refreshtoken}"`,[]);
                await executeSQL(`INSERT INTO session_detail value("${token}","${lastTime}")`,[])
            }
        }catch(e){

        }
    }

    async deleteToken(refreshtoken){
        try{
            const Credential = await  executeSQL(`SELECT * FROM session_detail WHERE token = "${refreshtoken}"`,[])
            if(Credential[0]!=null){  
                await executeSQL(`DELETE FROM session_detail WHERE token = "${refreshtoken}"`,[]);
                return ("sucssesfully logged out")
            }
            return ("already logged out")
        }catch(e){
            console.log(e)
        }
    }
    async logout(){
        console.log("Logged out");
    }

    async applyLeave(){
        console.log("Leave request is sent");
    }

    async editEmergancy(){
        console.log("succsusfully edided");
    }

    async getLeaveCount(){
        console.log("20 leaves remain");
    }

}

module.exports = {User}