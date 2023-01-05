const Accept = document.getElementsByClassName("Accept");
const Reject = document.getElementsByClassName("Reject");
let array;


function viewRequestInfo(){
    const div = document.getElementById('container');
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');

    fetch('/user/viewrequest',{
        method: 'get',
        headers:{
            'Content-type':'application/json',
            'authorization':`bearer ${accesstoken}`},
    })
    .then(res=>  res.json())
    .then(data => {
        array = data;

        array.forEach(element => {
            let approveID = "a" + element.emp_ID;
            let rejectID = "r" + element.emp_ID;
            let clickedApprovedID = "clicked" + approveID;
            let clickedrejectedID = "clicked" + approveID;

            const markup = `<div class="tableRow">
            <div class="cell" style="width:12%">${element.req_No}</div>
            <div class="cell">
                <ul>
                    <li>Employee ID: ${element.emp_ID}</li>
                    <li>Name: ${element.full_name}</li>
                    <li>Department: ${element.department}</li>
                    <li>Job Title: ${element.job_title}</li>
                </ul>
            </div>
            <div class="cell">
                <ul>
                    <li>Type: ${element.leave_type}</li>
                    <li>Date: ${element.leave_date}</li>
                    <li>Reason: ${element.reason}</li>
                </ul>
            </div>
            <div class="cell">
                <ul>
                    <li>Annual: ${element.annual_count} / ${element.annual}</li>
                    <li>Casual: ${element.casual_count} / ${element.casual}</li>
                    <li>Maternity: ${element.maternity_count} / ${element.maternity}</li>
                    <li>No Pay: ${element.noPay_count} / ${element.noPay}</li>
                </ul>
            </div>
            <div class="cell">
                <button id= ${approveID} class="leave-approve-btn" onclick="show_hide(this)">Approve</button>
                <button id= ${rejectID} class="leave-reject-btn" onclick="show_hide(this)">reject</button>
                <div id= ${clickedApprovedID} class="leave-approved">Approved</div>
                <div id= ${clickedrejectedID} class="leave-rejected">Rejected</div>
            </div>
        </div>`
        });

        document.querySelector('.tableContent').insertAdjacentHTML('beforeend', markup);

        
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
            fetch('/user/viewrequest',{
                method:'get',
                headers:{'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`},
                
            })
            .then(res=> res.json())
            .then(data => {
                div.textContent = data;
                array = data;
                console.log(data)
            })
        })
    })
}

function show_hide(obj){
    obj.style.display="none";
    document.getElementById("clicked"+obj.id).style.display="inline";
    if(obj.id[0]=='a'){
        array.forEach(element => {
            if (element.req_No === obj.id.slice(1)){
                element["status"] = "approved"; 
            }
        })
        document.getElementById("r"+obj.id.slice(1)).style.display="none";      
    }
    else{
        array.forEach(element => {
            if (element.req_No === obj.id.slice(1)){
                element["status"] = "rejected"; 
            }
        })
        document.getElementById("a"+obj.id.slice(1)).style.display="none";
    }
}

viewRequestInfo();



    

