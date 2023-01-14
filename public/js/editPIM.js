
const div = document.getElementById('container');
const accesstoken = localStorage.getItem('Accesstoken');
const refreshtoken = localStorage.getItem('Refreshtoken');

let searchbtn = document.getElementById('Search-btn');
let employee_ID =document.getElementById('employee_ID');
const editEmployeeRoute = '/user/editemployeebyhr';
const editEmploymentRoute = '/user/editemploymentbyhr';
const ediEmergencyRoute = '/user/editemergancybyhr';


if (searchbtn){
searchbtn.addEventListener('click', getInfo);

function getInfo(){

    console.log(employee_ID.value);
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    console.log(accesstoken);
    fetch('/user/checkrecords',{
        method:'post',
        // headers:new Headers({'Content-Type':'application/json'}),
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            emp_ID:employee_ID.value
        })
    })
    .then(res=>  res.json())
    .then(data => {
        console.log(data);
        createPersonalTable(data);
        createEmploymentTable(data);
        createEmergencyTable(data);
})}
}

    // .catch ((err) => {
    //     fetch('/auths/token',{
    //         method:'post',
    //         headers:new Headers({'Content-Type':'application/json'}),
    //         body:JSON.stringify({
    //             refreshtoken:refreshtoken
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         localStorage.setItem('Accesstoken',data.accesstoken);
    //         const accesstoken = localStorage.getItem('Accesstoken');
    //         fetch('/user/checkrecords ',{
    //             method:'get',
    //             headers:{'Content-Type':'application/json',
    //                     'authorization':`bearer ${accesstoken}`},
                
    //         })
    //         .then(res=> res.json())
    //         .then(data => {
    //             div.textContent = data;
    //             console.log(data)
    //         })
    //     })
    // })

function send_data(obj, employeeID, route){
    let attribute=obj.id;
    let data=document.getElementById('i'+attribute).value;

    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    console.log({route})
    fetch(route, {
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            emp_ID:employeeID,
            field:attribute,
            value:data
        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data)
        getInfo();
        
    })
}

function createPersonalTable(data){
    let element = document.getElementById("pblock");
    if (element) {
        element.parentNode.removeChild(element);
    }
    const markup = 
            `<div id="pblock">
            <div class="tableRow">
                <div class="cell">Employee ID</div>
                <div class="cell">${data.ID}</div>
                <div class="cell">Can not edit employee ID</div>
                <div class="cell" style="width: 16%;"></div>
            </div>
            <div class="tableRow">
                <div class="cell">First Name</div>
                <div class="cell">${data.first_name}</div>
                <div class="cell"><input class="input" id="ifirst_name" type="text" placeholder="First Name" ></input></div>
                <div class="cell" style="width: 16%;"><button id="first_name" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Middle Name</div>
                <div class="cell">${data.middle_name}</div>
                <div class="cell"><input class="input" id="imiddle_name" type="text" placeholder="Middle Name" ></input></div>
                <div class="cell" style="width: 16%;"><button id="middle_name" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Last Name</div>
                <div class="cell">${data.last_name}</div>
                <div class="cell"><input class="input" id="ilast_name" type="text" placeholder="Last Name" ></input></div>
                <div class="cell" style="width: 16%;"><button id="last_name" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Road</div>
                <div class="cell">${data.road}</div>
                <div class="cell"><input class="input" id="iroad" type="text" placeholder="Road" ></input></div>
                <div class="cell" style="width: 16%;"><button id="road" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">City</div>
                <div class="cell">${data.city}</div>
                <div class="cell"><input class="input" id="icity" type="text" placeholder="City" ></input></div>
                <div class="cell" style="width: 16%;"><button id="city" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Country</div>
                <div class="cell">${data.country}</div>
                <div class="cell"><input class="input" id="icountry" type="text" placeholder="Country" ></input></div>
                <div class="cell" style="width: 16%;"><button id="country" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Date Of Birth</div>
                <div class="cell">${data.date_of_birth}</div>
                <div class="cell"><input class="input" id="idate_of_birth" type="text" placeholder="YYYY-MM-DD" ></input></div>
                <div class="cell" style="width: 16%;"><button id="date_of_birth" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Phone Number</div>
                <div class="cell">${data.phone_number}</div>
                <div class="cell"><input class="input" id="iphone_number" type="text" placeholder="Phone Number" ></input></div>
                <div class="cell" style="width: 16%;"><button id="phone_number" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Gender</div>
                <div class="cell">${data.gender}</div>
                <div class="cell">
                    <select name="Gender" id="igender" style="border-radius:10px; padding: 0 10px 0 10px;">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>  
                    </select></div>
                <div class="cell" style="width: 16%;"><button id="gender" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Marital status</div>
                <div class="cell">${data.marital_status}</div>
                <div class="cell">
                    <select name="Marital-status" id="imarital_status" style="border-radius:10px; padding: 0 10px 0 10px;">
                        <option value="Unmarried">Unmarried</option>
                        <option value="Married">Married</option>  
                    </select>
                </div>
                <div class="cell" style="width: 16%;"><button id="marital_status" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmployeeRoute})'">Edit</button></div>
            </div>
            </div>`;

        document.querySelector('#edit-PIM').insertAdjacentHTML('beforeend', markup);
}

function createEmploymentTable(data){
    let element = document.getElementById("emblock");
    if (element) {
        element.parentNode.removeChild(element);
    }
    const markup = 
            `<div id="emblock">
            </div>
            <div class="tableRow">
                <div class="cell">Branch ID</div>
                <div class="cell">${data.branch_ID}</div>
                <div class="cell"><input class="input" id="ibranch_ID" type="text" placeholder="Branch ID" ></input></div>
                <div class="cell" style="width: 16%;"><button id="branch_ID" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmploymentRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Job Title</div>
                <div class="cell">${data.job_title}</div>
                <div class="cell"><input class="input" id="ijob_title" type="text" placeholder="Job Title" ></input></div>
                <div class="cell" style="width: 16%;"><button id="job_title" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmploymentRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Department</div>
                <div class="cell">${data.department}</div>
                <div class="cell">
                    <select name="Department" id="idepartment" style="border-radius:10px; padding: 0 10px 0 10px;">
                        <option value="Cutting">Cutting</option>  
                        <option value="Design">Design</option>
                        <option value="HR">HR</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Printing">Printing</option>
                        <option value="Sewing">Sewing</option>
                    </select>
                </div>
                <div class="cell" style="width: 16%;"><button id="department" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmploymentRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Employment Status</div>
                <div class="cell">${data.employeement_status}</div>
                <div class="cell">
                    <select name="Employment-status" id="iemployeement_status" style="border-radius:10px; padding: 0 10px 0 10px;">
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option> 
                        <option value="Intern">Intern</option>
                        <option value="Permanent">Permanent</option> 
                    </select>
                </div>
                <div class="cell" style="width: 16%;"><button id="employeement_status" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmploymentRoute}')">Edit</button></div>
            </div>            
            <div class="tableRow">
                <div class="cell">Working Time</div>
                <div class="cell">${data.working_time}</div>
                <div class="cell">
                    <select name="Working-time" id="iworking_time" style="border-radius:10px; padding: 0 10px 0 10px;">
                        <option value="Fulltime">Fulltime</option>
                        <option value="Parttime">Parttime</option>  
                    </select>
                </div>
                <div class="cell" style="width: 16%;"><button id="working_time" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmploymentRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Paygrade</div>
                <div class="cell">${data.pay_grade}</div>
                <div class="cell">
                    <select name="Paygrade" id="ipay_grade" style="border-radius:10px; padding: 0 10px 0 10px;">
                        <option value="Level1">Level1</option>
                        <option value="Level2">Level2</option>  
                        <option value="Level3">Level3</option> 
                        <option value="Level4">Level4</option> 
                    </select>
                </div>
                <div class="cell" style="width: 16%;"><button id="pay_grade" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmploymentRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Employee Type</div>
                <div class="cell">${data.type}</div>
                <div class="cell">
                <select name="Employee-type" id="itype" style="border-radius:10px; padding: 0 10px 0 10px;">
                        <option value="General">General</option>  
                        <option value="HRManager">HRManager</option> 
                        <option value="Supervisor">Supervisor</option> 
                    </select>
                </div>
                <div class="cell" style="width: 16%;"><button id="type" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmploymentRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Is Suupervisor</div>
                <div class="cell">${data.supervisor}</div>
                <div class="cell"><input class="input" id="isupervisor" type="text" placeholder="Is Supervisor" ></input></div>
                <div class="cell" style="width: 16%;"><button id="supervisor" class="edit-btn" onclick="send_data(this, ${data.ID}, '${editEmploymentRoute}')">Edit</button></div>
            </div>
            </div>`;
           
    document.querySelector('#edit-employement-detail').insertAdjacentHTML('beforeend', markup);
}

function createEmergencyTable(data){
    let element = document.getElementById("emergencyBlock");
    if (element) {
        element.parentNode.removeChild(element);
    }
    const markup = 
            `<div id="emergencyBlock">
            <div class="tableRow">
                <div class="cell">Contact Person First Name</div>
                <div class="cell">${data.emg_first_name}</div>
                <div class="cell"><input class="input" id="iemg_first_name" type="text" placeholder="First Name" ></input></div>
                <div class="cell" style="width: 16%;"><button id="emg_first_name" class="edit-btn" onclick="send_data(this, ${data.ID}, '${ediEmergencyRoute}')">Edit</button></div>
            </div>            
            <div class="tableRow">
                <div class="cell">Contact Person Last Name</div>
                <div class="cell">${data.emg_last_name}</div>
                <div class="cell"><input class="input" id="iemg_last_name" type="text" placeholder="Last Name" ></input></div>
                <div class="cell" style="width: 16%;"><button id="emg_last_name" class="edit-btn" onclick="send_data(this, ${data.ID}, '${ediEmergencyRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Relationship</div>
                <div class="cell">${data.emg_relationship}</div>
                <div class="cell"><input class="input" id="iemg_relationship" type="text" placeholder="Relationship" ></input></div>
                <div class="cell" style="width: 16%;"><button id="emg_relationship" class="edit-btn" onclick="send_data(this, ${data.ID}, '${ediEmergencyRoute}')">Edit</button></div>
            </div>
            <div class="tableRow">
                <div class="cell">Phone Number</div>
                <div class="cell">${data.emg_phone_number}</div>
                <div class="cell"><input class="input" id="iemg_phone_number" type="text" placeholder="Phone Number" ></input></div>
                <div class="cell" style="width: 16%;"><button id="emg_phone_number" class="edit-btn" onclick="send_data(this, ${data.ID}, '${ediEmergencyRoute}')">Edit</button></div>
            </div>
            
            </div>`;

        document.querySelector('#edit-emergency-details').insertAdjacentHTML('beforeend', markup);
}
