const {User} = require("../models/UserModel");

var users = new Map();
var user = new User();

class UserController{
    async login(req){
        
        //const body = method.getBody();
        const username = req.body.username
        const password = req.body.password 

        const status = await user.login(username,password);

        return(status);
    }

}

module.exports = {UserController}

