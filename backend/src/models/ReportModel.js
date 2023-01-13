const {executeSQL} = require("../database/database");

class Report{
    async getEmployeeReport(department_name){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view WHERE department = ?`,[department_name]);
            if(result){  
                return result;
            }
            return ({message:"No records"})
        }catch(e){
            console.log(e);
        }
    }
    async getLeaveReport(periodBegin,periodEnd){
        try{
            const result = await  executeSQL(`SELECT leave_view.department,COUNT(req_No) FROM leave_view WHERE leave_view.leave_date BETWEEN ? AND ?`,[periodBegin,periodEnd]);
            if(result){  
                return result;
            }
            return ({message:"No records"})
        }catch(e){
            console.log(e);
        }
    }
    async getEmpReportJobtitle(job_title){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view WHERE job_title = ?`,[job_title]);
            if(result){  
                return result;
            }
            return ({message:"No records"})
        }catch(e){
            console.log(e);
        }
    }
    async getEmpReportDepartment(department_name){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view WHERE department = ?`,[department_name]);
            if(result){  
                return result;
            }
            return ({message:"No records"})
        }catch(e){
            console.log(e);
        }
    }
    async getEmpReportPaygrade(paygrade){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view WHERE pay_grade = ?`,[paygrade]);
            if(result){  
                return result;
            }
            return ({message:"No records"})
        }catch(e){
            console.log(e);
        }
    }
    async getEmpReportCustom(field,value){
        try{
            const result = await  executeSQL(`SELECT * FROM employee_view emp_view 
                                            RIGHT JOIN (SELECT * FROM custom WHERE custom_field = ? AND value = ?) cus 
                                            ON emp_view.emp_ID = cus.emp_ID`,[field,value]);
            if(result){  
                return result;
            }
            return ({message:"No records"})
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = {Report}