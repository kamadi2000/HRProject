const { Report } = require('../models/ReportModel');

var report = new Report();
class reportController{

    async getEmployeeReport(department_name){
        const status = await report.getEmployeeReport(department_name);
        return (status);
    }
    async getLeaveReport(periodBegin,periodEnd){
        const status = await report.getLeaveReport(periodBegin,periodEnd);
        return (status);
    }
    async createView(){
        await report.createView();
    }
    async getEmpReportJobtitle(job_title){
        const status = await report.getEmpReportJobtitle(job_title);
        return (status);
    }
    async getEmpReportDepartment(department_name){
        const status = await report.getEmpReportDepartment(department_name);
        return (status);
    }
    async getEmpReportPaygrade(paygrade){
        const status = await report.getEmpReportPaygrade(paygrade);
        return (status);
    }
    async getEmpReportCustom(field,value){
        const status = await report.getEmpReportCustom(field,value);
        return (status);
    }
}
module.exports = {reportController};