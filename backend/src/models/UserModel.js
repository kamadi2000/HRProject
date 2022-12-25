//const uniqid = require('uniqid');
const {executeSQL} = require("../database/database");
const connection = require("../database/database")
const bcrypt = require("bcryptjs");

class User{
    // constructor(username, firstName, lastName, idVal){
    //     this.username = username;
    //     this.type = "General";

    //     if(firstName){
    //         this.firstName = firstName;
    //     }else{
    //         this.firstName = null;
    //     }

    //     if(lastName){
    //         this.lastName = lastName;
    //     }else{
    //         this.lastName = null;
    //     }

    //     if(idVal){
    //         this.sessionID = idVal;
    //     }else{
    //         //this.sessionID = uniqid();
    //     }
    // }

    async login(username,password){
        try{
            var Credential = await executeSQL("SELECT * FROM user WHERE employee_ID = ?",[username])
            const salt = await bcrypt.genSalt(10);
            const userpassword = await bcrypt.hash(password, salt)
            const status = await bcrypt.compare(Credential[0].password,userpassword)
            if (status) {
                const userdata = await executeSQL("SELECT * FROM employee WHERE ID = ?",[username])
                return userdata
            }else{
                console.log("username or password is invalid")
            }
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