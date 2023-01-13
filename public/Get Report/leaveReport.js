const period_begin = document.getElementById('period_begin');
const period_end = document.getElementById('period_end');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/reports/reportleave',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            periodBegin:period_begin.value,
            periodEnd:period_end.value

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
            fetch('/reports/reportleave',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    periodBegin:period_begin.value,
                    periodEnd:period_end.value
                        })
                
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data);
            })
        })
    })
})
