const field = document.getElementById('field');
const value = document.getElementById('value');
const editbtn = document.getElementById('edit-btn');

editbtn.addEventListener('click',()=>{
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    fetch('/user/editemployeebyhr',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            field:field.value,
            value:value.value
        })
    })
    .then(res => res.json())
    .then(data=> {
        if (data.message){
            alert(data.message);
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
            fetch('/user/editemployeebyhr',{
                method:'post',
                headers:new Headers({'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    field:field.value,
                    value:value.value
                        })
                
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
            })
        })
    })
})
