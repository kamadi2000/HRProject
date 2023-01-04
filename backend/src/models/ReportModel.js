const {executeSQL} = require("../database/database");
const connection = require("../database/database")
const bcrypt = require("bcryptjs");

class Report{
    async getEmployeeReport(department_name){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view WHERE department = "${department_name}"`,[]);
            if(result){  
                return result;
            }
            return (null)
        }catch(e){
            console.log(e);
        }
    }
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
    async getLeaveReport(periodBegin,periodEnd){
        try{
            const result = await  executeSQL(`SELECT leave_view.department,COUNT(req_No) FROM leave_view WHERE leave_view.leave_date BETWEEN "${periodBegin}" AND "${periodEnd}"`,[]);
            if(result){  
                return result;
            }
            return (null)
        }catch(e){
            console.log(e);
        }
    }
    async getEmpReportJobtitle(job_title){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view WHERE job_tittle = "${job_title}"`,[]);
            if(result){  
                return result;
            }
            return (null)
        }catch(e){
            console.log(e);
        }
    }
    async getEmpReportDepartment(department_name){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view WHERE department = "${department_name}"`,[]);
            if(result){  
                return result;
            }
            return (null)
        }catch(e){
            console.log(e);
        }
    }
    async getEmpReportPaygrade(paygrade){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view WHERE pay_grade = "${paygrade}"`,[]);
            if(result){  
                return result;
            }
            return (null)
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = {Report}