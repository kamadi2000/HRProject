const {executeSQL} = require("../database/database");
const connection = require("../database/database")
const bcrypt = require("bcryptjs");

class View{
    async createView(){   
        try{
            await executeSQL(`CREATE OR REPLACE VIEW leave_view AS 
                        SELECT leave_d.req_No,leave_d.leave_date,emp_d.department FROM leave_detail leave_d 
                        LEFT JOIN employment_detail emp_d 
                        ON leave_d.emp_ID=emp_d.emp_ID`,[])
            await executeSQL(`CREATE OR REPLACE VIEW employee_view AS 
                        SELECT * FROM employee emp
                        INNER JOIN employment_detail emp_d 
                        ON emp.ID=emp_d.emp_ID`,[]);
        }
        catch(e){
            console.log(e);
        }
    }
}
module.exports = {View}