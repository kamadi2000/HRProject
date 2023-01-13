//login form validation
const report = document.getElementById('report');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    if (report.value == "getEmployeeReport"){
        location.href = '/EmployeeReport';
    }else  if (report.value == "getLeaveReport"){
        location.href = '/leaveReport';
    }else  if (report.value == "getEmpReportDepartment"){
        location.href = '/departmentReport';
    }else  if (report.value == "getEmpReportPaygrade"){
        location.href = '/paygradeReport';
    }else  if (report.value == "getEmpReportCustom"){
        location.href = '/customAttReport';
    }else  if (report.value == "getEmpReportJobtitle"){
        location.href = '/JobtitleReport';
    }
})
