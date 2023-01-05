const emp_ID = document.getElementById('emp_ID');
const reason = document.getElementById('reason');
const date = document.getElementById('date');
const leave_type = document.getElementById('leave-type');
const submitbtn = document.getElementById('submit-btn');



submitbtn.addEventListener('click',()=>{
    console.log(emp_ID.value, reason.value,date.value,leave_type.value)
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/applyleave',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            username:emp_ID.value,
            reason:reason.value,
            date:date.value,
            leave_type:leave_type.value,
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
            fetch('/user/applyleave',{
                method:'post',
                headers:{'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`},
                body:JSON.stringify({
                    // username:emp_ID.value,
                    reason:reason.value,
                    date:date.value,
                    leave_type:leave_type.value,
                
            })
         })
            .then(res=> res.json())
            .then(data => {
                console.log(data);
            })
        
    })
})
})

