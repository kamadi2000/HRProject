//login form validation
const username = document.getElementById('username')  || null;
const password = document.getElementById('password');
const Cpassword = document.getElementById('Cpassword');
const accessLevel = document.getElementById('accessLevel');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    console.log(username.value, password.value)
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/createuseraccount',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            username : username.value,
            password : password.value,
            confirmPassword : Cpassword.value,
            accessLevel : accessLevel.value,

        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);
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
            fetch('/user/createuseraccount ',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    username : username.value,
                    password : password.value,
                    confirmPassword : Cpassword.value,
                    accessLevel : accessLevel.value,
                        })
                
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
            })
        })
    })
})
