//login form validation
const username = document.getElementById('username')  || null;
const password = document.getElementById('password');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    console.log(username.value, password.value)

    fetch('users/getList', {
        headers:new Headers({'Content-Type':'application/json', }),
    })

    fetch('/auths/login',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json'}),
        body:JSON.stringify({
            username:username.value,
            password:password.value
        })
    })
    // .then(data=> {
    //     console.log(data)
    //     return data
    // })
    // .catch((err) => {
    //     console.error(err); 
    // }))
    .then(res => res.json())
    .then(data=> {
        console.log(data);
        localStorage.setItem('Accesstoken',data.accesstoken);
        localStorage.setItem('Refreshtoken', data.refreshtoken);
        const accesstoken = localStorage.getItem('Accesstoken');
        const refreshtoken = localStorage.getItem('Refreshtoken');
        console.log(accesstoken,refreshtoken)

        // fetch('/auths',{
        //     headers : {'authorization':`bearer ${info['accesstoken']}`}
        // })
        // .then()
        // if (data.username){
        //     alert('login successful');
        // }else{
        //     alert(data);
        // }
    })

})

