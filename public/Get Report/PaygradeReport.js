//login form validation
const paygrade = document.getElementById('paygrade');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/reports/reportemployee/paygrade',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            paygrade:paygrade.value

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
            fetch('/reports/reportemployee/paygrade',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    paygrade:paygrade.value
                        })
                
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data);
            })
        })
    })
})
