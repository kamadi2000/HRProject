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
        buildTable(data.data);
        buildTable(data.emergency);
        buildTable(data.phoneNumber);
              
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

function buildTable(data){
    var table = document.getElementById('PIM-table');

    for (const [key, value] of Object.entries(data)) { 
        var row1='<tr>';
        row1+= '<td>' + 
            key + '</td>';

        row1 += '<td>' + 
            value + '</td>';
        row1 +='<td><input type="text" placeholder=""></td>';
        row1 +='<td><button type="button" class="btn btn-danger btn-sm" >Edit</button></td>';

        row1 += '</tr>';
        table.innerHTML += row1


    }
}

getPIMinfo();