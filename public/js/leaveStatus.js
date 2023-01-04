function getLeaveinfo(){
    const div = document.getElementById('container');
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');

    fetch('user/leavestatus',{
        method: 'get',
        headers:{
            'Content-type':'application/json',
            'authorization':`bearer ${accesstoken}`},
    })
    .then(res=>  res.json())
    .then(data => {
        console.log({data})
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
            fetch('/user/leavestatus',{
                method:'get',
                headers:{'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`},
                
            })
            .then(res=> {
                return res.json()
            })
            .then(data => {
                data.forEach(element => {
                    const markup = `<div class="tableRow">
                    <div class="cell">${element.date}</div>
                    <div class="cell">${element.leave_type}</div>
                    <div class="cell">${element.reason}</div>
                    <div class="cell">${element.status}</div>
                </div>`;

                document.querySelector('.tableContent').insertAdjacentHTML('beforeend', markup);
                });
            })
        })
    })
}




    

