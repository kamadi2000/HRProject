//login form validation
const username = document.getElementById('username')  || null;
const password = document.getElementById('password');
const submitbtn = document.getElementById('submit-btn');

const searchbtn = document.getElementById('Search-btn');
const employee_ID =document.getElementById('employee_ID')

submitbtn.addEventListener('click',()=>{
    console.log(username.value, password.value)
    fetch('/auths/login',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json'}),
        body:JSON.stringify({
            username:username.value,
            password:password.value
        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);
        localStorage.setItem('Accesstoken',data.accesstoken);
        localStorage.setItem('Refreshtoken', data.refreshtoken);
        const accesstoken = localStorage.getItem('Accesstoken');
        const refreshtoken = localStorage.getItem('Refreshtoken');
        console.log(accesstoken,refreshtoken,data.type);
        
        const job_title = data.type;
        if (job_title == "HRManager"){
            location.href = '/HRmanager';
        }else if (job_title == "Supervisor"){
            location.href = '/supervisor';
        }else if (job_title == "Admin"){
            location.href = '/AdminPage';
        }else if (job_title == "General"){
            location.href = 'generalUser'
        }else if (job_title == "Manager"){
            location.href = '/manager' 
        }    
    })
    .catch ((err) => {
        alert("Invalid user name or password")
        console.error(err);
    })
})




 // fetch('/auths',{
        //     headers : {'authorization':`bearer ${info['accesstoken']}`}
        // })

