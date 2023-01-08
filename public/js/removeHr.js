//login form validation
const username = document.getElementById('username')  || null;
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    console.log(username.value)
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/deletehraccount',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            username : username.value,
        })
    })
    .then(res => res.json())
    .then(data=> {
        if (data.message){
            alert(data.message);
            location.href = "/removeUser";
        }
        
        
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
            fetch('/user/deletehraccount',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    username : username.value,
                        })
                
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
            })
        })
    })
})
