const db = require("../database/database")

exports.queryEmployees = (resultFunction) => {
    db.query("SELECT * FROM employee;", [], (err, queryRes) => {
        if(err){
            console.log(err)
        }
        else {
            resultFunction(queryRes)
        }
    })
}