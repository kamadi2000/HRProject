const mysql = require('mysql')
const { config } = require('./config')
require('dotenv').config();

var connection = mysql.createPool({
    host:config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});
function trigger(triggerDefinition){
    return new Promise((res,rej)=>{
        connection.query(triggerDefinition, function (error, results, fields) {
            if (error) {
              console.error(error);
              rej(err)
            } else {
              console.log('Trigger created successfully.');
            }
          })
    })
}

function executeSQL(sql,placeholder){
    console.log(sql)
    return new Promise((res,rej)=>{
    connection.query(sql,placeholder, (err,result)=>{
        if(err){
            rej(err)
        }
        const resulted = Object.values(JSON.parse(JSON.stringify(result)))
        if(resulted.length==0){
            res(null)
        }
        res(resulted)
    })
})
}
module.exports = connection
module.exports = {executeSQL,trigger}
