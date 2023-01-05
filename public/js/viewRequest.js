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
            <div class="cell" style="width:12%">${element.emp_ID}</div>
            <div class="cell">
                <ul>
                    <li>Name: ${element.name}</li>
                    <li>Department: ${element.department}</li>
                    <li>Job Title: ${element.job_title}</li>
                </ul>
            </div>
            <div class="cell">
                <ul>
                    <li>Type: ${element.type}</li>
                    <li>Date: ${element.date}</li>
                    <li>Reason: ${element.reason}</li>
                </ul>
            </div>
            <div class="cell">
                <ul>
                    <li>Annual: ${element.remaining_annual}</li>
                    <li>Casual: ${element.remaining_casual}</li>
                    <li>Maternity: ${element.remaining_maternity}</li>
                    <li>No Pay: ${element.remaining_nopay}</li>
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


function getID(e){
    console.log(e.id.slice(1));
    console.log(array);
    // fetch('/user/requestvalidation',{
    //     method:'post',
    //     headers:{'Content-Type':'application/json',
    //     'authorization':`bearer ${accesstoken}`,
    //     body:JSON.stringify({
    //         emp_ID : emp_ID.value,
    //         date : date.value,
    //         decision : decision.value
    //         type = req.body.leaveType
    //     })}
    // })
}
viewRequestInfo();



    

