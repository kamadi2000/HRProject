//login form validation
const department_name = document.getElementById('department_name');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/reports/reportemployee',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            department_name:department_name.value

        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);
        
        let element = document.getElementById("block");
        while (element) {
            element.parentNode.removeChild(element);
            element = document.getElementById("block");
        }

        data.forEach(element => {
            const markup = `
            <div id="block">
            <div class="tableRow">
            <div class="cell" style="width:20%;">${element.ID}</div>
            <div class="cell" style="width: 40%;">
                <ul>
                    <li>First Name: ${element.first_name}</li>
                    <li>Middle Name: ${element.middle_name}</li>
                    <li>Last Name: ${element.last_name}</li>
                    <li>Date Of Birth: ${element.date_of_birth}</li>
                    <li>Gender: ${element.gender}</li>
                    <li>Marital Status: ${element.marital_status}</li>
                    <li>Road: ${element.road}</li>
                    <li>City: ${element.city}</li>
                    <li>Country: ${element.country}</li>                    
                </ul>
            </div>
            <div class="cell" style="width: 40%;">
                <ul>
                    <li>Branch ID: ${element.branch_ID}</li>
                    <li>Department: ${element.department}</li>
                    <li>Job Title: ${element.job_title}</li>
                    <li>Paygrade: ${element.pay_grade}</li>
                    <li>Employeement Status: ${element.employeement_status}</li>
                    <li>Working Time: ${element.working_time}</li>
                </ul>
            </div>
        </div>
        </div>`
        document.querySelector('.tableContent').insertAdjacentHTML('beforeend', markup);
        });

            

})
    .catch ((err) => {
        fetch('/auths/token',{
            method:'post',
            headers:new Headers({'Content-Type':'application/json'}),
            body:JSON.stringify({
                refreshtoken:refreshtoken
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('Accesstoken',data.accesstoken);
            const accesstoken = localStorage.getItem('Accesstoken');
            fetch('/reports/reportemployee',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    department_name:department_name.value
                        })
                
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data);
            })
        })
    })
})
