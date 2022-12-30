//login form validation
const username = document.getElementById('username')  || null;
const password = document.getElementById('password');
const submitbtn = document.getElementById('submit-btn');

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
        if (data.username){
            alert('login successful');
        }else{
            alert(data);
        }
    })

})