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