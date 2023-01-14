const emp_ID = document.getElementById('emp_ID');
const field = document.getElementById('field');
const attribute = document.getElementById('attribute');
const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener('click',()=>{
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/addCustomField',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            emp_ID:emp_ID.value,
            custom_field:field.value,
            value:attribute.value

        })
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);

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
    //         localStorage.setItem('Accesstoken',data.accesstoken);
    //         const accesstoken = localStorage.getItem('Accesstoken');
    //         fetch('/reports/addCustomField',{
    //             method:'post',
    //             headers:new Headers({'Content-Type':'application/json',
    //                     'authorization':`bearer ${accesstoken}`}),
    //             body:JSON.stringify({
    //                 emp_ID:emp_ID.value,
    //                 custom_field:field.value,
    //                 value:attribute.value
    //                     })
                
                
    //         })
    //         .then(res=> res.json())
    //         .then(data => {
    //             console.log(data);
    //         })
    //     })
    // })
})
