const Accept = document.getElementsByClassName("Accept");
const Reject = document.getElementsByClassName("Reject");
let array;


function viewRequestInfo(){
    const div = document.getElementById('container');
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');

    fetch('/user/viewrequest',{
        method: 'get',
        headers:{
            'Content-type':'application/json',
            'authorization':`bearer ${accesstoken}`},
    })
    .then(res=>  res.json())
    .then(data => {
        array = data;
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
            fetch('/user/viewrequest',{
                method:'get',
                headers:{'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`},
                
            })
            .then(res=> res.json())
            .then(data => {
                div.textContent = data;
                array = data;
                console.log(data)
            })
        })
    })
}


function getID(e){
    console.log(e.id.slice(1));
    console.log(array);
    // fetch('/user/requestvalidation',{
    //     method:'post',
    //     headers:{'Content-Type':'application/json',
    //     'authorization':`bearer ${accesstoken}`,
    //     body:JSON.stringify({
    //         emp_ID : emp_ID.value,
    //         date : date.value,
    //         decision : decision.value
    //         type = req.body.leaveType
    //     })}
    // })
}
viewRequestInfo();



    

