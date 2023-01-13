const searchbtn = document.getElementById('Search-btn');
const employee_ID =document.getElementById('employee_ID')

if(searchbtn){
searchbtn.addEventListener('click',()=>{

    console.log(employee_ID.value);
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');
    console.log(accesstoken);

    fetch('/user/emergancydetail',{
        method:'post',
        // headers:new Headers({'Content-Type':'application/json'}),
        headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
        body:JSON.stringify({
            emp_ID:employee_ID.value
        })
        
    })
    .then(res=> res.json())
    .then(data => {
        console.log(data);
        let element = document.getElementById("block");
        if(element){
            element.parentNode.removeChild(element);
        }
        
            const markup = `<div id="block">
            <div class="tableRow">
                <div class="cell" style="width: 40%;">Employee ID</div>
                <div class="cell" style="width: 60%;">${data.emp_ID}</div>
            </div>
            <div class="tableRow">
                <div class="cell" style="width: 40%;">First Name</div>
                <div class="cell" style="width: 60%;">${data.first_name}</div>
            </div>
            <div class="tableRow">
                <div class="cell" style="width: 40%;">Last Name</div>
                <div class="cell" style="width: 60%;">${data.last_name}</div>
            </div>
            <div class="tableRow">
                <div class="cell" style="width: 40%;">Relationship</div>
                <div class="cell" style="width: 60%;">${data.relationship}</div>
            </div>
            <div class="tableRow">
                <div class="cell" style="width: 40%;">Contact number</div>
                <div class="cell" style="width: 60%;">${data.phone_number}</div>
            </div>
          </div>`;

          document.querySelector('.tableContent').insertAdjacentHTML('beforeend', markup);
          
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
            console.log(data)
            localStorage.setItem('Accesstoken',data.accesstoken);
            const accesstoken = localStorage.getItem('Accesstoken');
            fetch('/user/emergancydetail',{
                method:'post',
                // headers:new Headers({'Content-Type':'application/json'}),
                headers:new Headers({'Content-Type':'application/json','authorization':`bearer ${accesstoken}`}),
                body:JSON.stringify({
                    emp_ID:employee_ID.value
                })
                
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
            })
        })
    })
})
}

