//login form validation
const department_name = document.getElementById('department')  || null;
const submitbtn = document.getElementById('submit-btn');

// const data = { data : {fmosjd: 'fdsaof'}, emergency: {fdsafs: 'fdionsaf'}, phone_numbers: ["fdsaf", 'fdsianfd']}

// const thani_object = {...data.data, ...data.emergency, phone_numbers: data.phone_numbers}

// const rows = Object.keys(thani_object).map(key => {

//     <div>
//         <div>{key}</div><div>{thani_object[key]}</div>
//     </div>
// })

// const renderTableData = (result) => {
//     return result.map((item, index) => {
//         return (
//             <tr>
//                 <td >item.Name</td>
//                 <td >item.Date</td>
//                 <td >item.state</td>
//             </tr>
//         )
//     })
// }


// const dataBinding = (result) => {
// let x = document.getElementById("tableSection");
// x.innerHTML = renderTableData(result);
// }

submitbtn.addEventListener('click',()=>{
    console.log(username.value)
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/deleteaccount',{
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
            fetch('/user/deleteaccount ',{
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
