const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/changepassword',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            oldPassword : oldPassword.value,
            newPassword:newPassword.value,
            confirmPassword : confirmPassword.value,

        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);
        alert(data.message);

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
            fetch('/user/changepassword ',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    oldPassword : oldPassword.value,
                    newPassword:newPassword.value,
                    confirmPassword : confirmPassword.value,
                        })
                
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
                alert(data.message);
            })
        })
    })
})
