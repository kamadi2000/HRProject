function getPIMinfo(){
    const div = document.getElementById('container');
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');

    fetch('/user/viewpim',{
        method: 'get',
        headers:{
            'Content-type':'application/json',
            'authorization':`bearer ${accesstoken}`},
    })
    .then(res=>  res.json())
    .then(data => {
        console.log(data);
        createTable(data);
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
    //         fetch('/user/checkrecords ',{
    //             method:'get',
    //             headers:{'Content-Type':'application/json',
    //                     'authorization':`bearer ${accesstoken}`},
                
    //         })
    //         .then(res=> res.json())
    //         .then(data => {
    //             div.textContent = data;
    //             console.log(data)
    //         })
    //     })
    // })
}

getPIMinfo();

function createTable(data){
    const markup = 
            `<div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Employee ID</div>
                <div class="cell" style="justify-content: left; width:60%">${data.ID}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">First Name</div>
                <div class="cell" style="justify-content: left; width:60%">${data.first_name}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Middle Name</div>
                <div class="cell" style="justify-content: left; width:60%">${data.middle_name}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Last Name</div>
                <div class="cell" style="justify-content: left; width:60%">${data.last_name}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Road</div>
                <div class="cell" style="justify-content: left; width:60%">${data.road}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">City</div>
                <div class="cell" style="justify-content: left; width:60%">${data.city}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Country</div>
                <div class="cell" style="justify-content: left; width:60%">${data.country}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Date Of Birth</div>
                <div class="cell" style="justify-content: left; width:60%">${data.date_of_birth}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Contact Number</div>
                <div class="cell" style="justify-content: left; width:60%">${data.phone_number}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Gender</div>
                <div class="cell" style="justify-content: left; width:60%">${data.gender}</div>
            </div>
            <div class="tableRow" style="padding-left: 30px">
                <div class="cell" style="justify-content: left; width:40%">Marital status</div>
                <div class="cell" style="justify-content: left; width:60%">${data.marital_status}</div>
            </div>`;

        document.querySelector('#view-my-detail').insertAdjacentHTML('beforeend', markup);
}
