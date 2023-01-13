//login form validation
const department_name = document.getElementById('department_name');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/reports/reportemployee',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            department_name:department_name.value

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
            fetch('/reports/reportemployee',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    department_name:department_name.value
                        })
                
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data);
            })
        })
    })
})
