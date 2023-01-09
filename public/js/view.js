const searchbtn = document.getElementById('Search-btn');
const employee_ID =document.getElementById('employee_ID')

searchbtn.addEventListener('click',()=>{

    console.log(employee_ID.value);
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    console.log(accesstoken);

    fetch('/user/checkrecords',{
        method:'post',
        // headers:new Headers({'Content-Type':'application/json'}),
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            emp_ID:employee_ID.value
        })
        
    })
    .then(res=> res.json())
    .then(data => {
        // location.href="/getPIMHr";
        console.log(data)
        
    })
    // .catch ((err) => {
    //     fetch('/auths/token',{
    //         method:'post',
    //         headers:new Headers({'Content-Type':'application/json'}),
    //         body:JSON.stringify({
    //             refreshtoken:refreshtoken
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         localStorage.setItem('Accesstoken',data.accesstoken);
    //         const accesstoken = localStorage.getItem('Accesstoken');
    //         fetch('/user/checkrecords',{
    //             method:'post',
    //             // headers:new Headers({'Content-Type':'application/json'}),
    //             headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
    //             body:JSON.stringify({
    //                 emp_ID:employee_ID.value
    //             })
                
    //         })
    //         .then(res=> res.json())
    //         .then(data => {
    //             console.log(data)
    //         })
    //     })
    // })
})