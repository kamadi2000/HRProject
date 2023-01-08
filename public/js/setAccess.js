//login form validation
const username = document.getElementById('emp_ID')  || null;
const accessLevel = document.getElementById('accessLevel');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/givepermission',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            username : username.value,
            level : accessLevel.value,

        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data); 
        alert(data.message)
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
            fetch('/user/givepermission ',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    username : username.value,
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
