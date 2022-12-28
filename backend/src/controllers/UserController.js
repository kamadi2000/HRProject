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
        await user.deleteToken(refreshtoken);
    }

}

module.exports = {UserController}

