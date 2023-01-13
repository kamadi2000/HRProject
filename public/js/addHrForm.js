//login form validation
const emp_ID = document.getElementById('emp_ID')  || null;
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const Mname = document.getElementById('Mname');
const birthday = document.getElementById('birthday');
const job = document.getElementById('job');
const department = document.getElementById('department');
const phoneNumber = document.getElementById('phoneNumber');
const branchID = document.getElementById('branchID');
// const address = document.getElementById('address');
const road = document.getElementById('road');
const city = document.getElementById('city');
const country = document.getElementById('country');
const Marital_status = document.getElementById('Marital-status');
const Employment_Status = document.getElementById('Employment-Status');
const Type = document.getElementById('Type');
const supervisor = document.getElementById('supervisor');
const superviseID = document.getElementById('supervisor_ID');
const Pay_Grade = document.getElementById('Pay-Grade');
const Fulltime_Parttime = document.getElementById('Fulltime-Parttime');
const gender = document.getElementById('gender');
const emg_first_name = document.getElementById('emg_first_name');
const emg_last_name = document.getElementById('emg_last_name');
const relationship = document.getElementById('relationship');
const emg_phoneNumber = document.getElementById('emg_phoneNumber');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    console.log(
                fname.value,
                lname.value,
                birthday.value,
                job.value,
                department.value,
                phoneNumber.value,
                branchID.value,
                road.value,
                city.value,
                country.value,
                Marital_status.value,
                Employment_Status.value,
                Type.value,
                Pay_Grade.value,
                Fulltime_Parttime.value,
                gender.value,
                emg_first_name.value,
                emg_last_name.value,
                relationship.value,
                emg_phoneNumber.value);
  
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/addHr',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            id:emp_ID.value,
            firstName:fname.value,
            middleName:Mname.value,
            lastName:lname.value,
            dateOfBirth:birthday.value,
            gender:gender.value,
            maritalStatus:Marital_status.value,
            road:road.value,
            city:city.value,
            country:country.value,
            phoneNumber:phoneNumber.value,
            supervisor:supervisor.value,
            jobTitle:job.value,
            paygrade:Pay_Grade.value,
            employeementStatus:Employment_Status.value,
            workingTime:Fulltime_Parttime.value,
            department:department.value,
            branchID:branchID.value,
            superviseID:superviseID.value,
            type:Type.value,
            emg_first_name:emg_first_name.value,
            emg_last_name:emg_last_name.value,
            relationship:relationship.value,
            emg_phone_number:emg_phoneNumber.value

        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);
        alert(data.massege);
       
        

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
            fetch('/user/addHr',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    id:emp_ID.value,
                    firstName:fname.value,
                    middleName:Mname.value,
                    lastName:lname.value,
                    dateOfBirth:birthday.value,
                    gender:gender.value,
                    maritalStatus:Marital_status.value,
                    road:road.value,
                    city:city.value,
                    country:country.value,
                    phoneNumber:phoneNumber.value,
                    supervisor:supervisor.value,
                    jobTitle:job.value,
                    paygrade:Pay_Grade.value,
                    employeementStatus:Employment_Status.value,
                    workingTime:Fulltime_Parttime.value,
                    department:department.value,
                    branchID:branchID.value,
                    supervisor:supervisor.value,
                    superviseID:superviseID.value,
                    type:Type.value,
                    emg_first_name:emg_first_name.value,
                    emg_last_name:emg_last_name.value,
                    relationship:relationship.value,
                    emg_phone_number:emg_phoneNumber.value
        
                })
            })
            .then(res => res.json())
            .then(data=> {
                console.log(data);
                alert(data.massege);
                
                
        
            })
            
        })
    })
})
