const mysql = require('mysql')
const { config } = require('./config')
require('dotenv').config();

var connection = mysql.createPool({
    host:config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});


function executeSQL(sql,placeholder){
    return new Promise((res,rej)=>{
    connection.query(sql,placeholder, (err,result)=>{
        if(err){
            rej(err)
        }
        const resulted = Object.values(JSON.parse(JSON.stringify(result)))

        res(resulted)
    })
})

}


module.exports = connection
module.exports = {executeSQL}
