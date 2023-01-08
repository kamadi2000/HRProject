function getLeaveCount(){
    const div = document.getElementById('container');
    const accesstoken = localStorage.getItem('Accesstoken');
    const refreshtoken = localStorage.getItem('Refreshtoken');

    fetch('/user/viewleavecount',{
        method: 'get',
        headers:{
            'Content-type':'application/json',
            'authorization':`bearer ${accesstoken}`},
    })
    .then(res=>  res.json())
    .then(data => {
        buildTable(data, "view-leave-count-table");
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
            fetch('/user/viewleavecount',{
                method:'get',
                headers:{'Content-Type':'application/json',
                        'authorization':`bearer ${accesstoken}`},
                
            })
            .then(res=> res.json())
            .then(data => {
                div.textContent = data;
                console.log(data)
            })
        })
    })
}
getLeaveCount();

function buildTable(data, tableName){
    var table = document.getElementById(tableName);

    for (const [key, value] of Object.entries(data[0])) { 
        var row1='<tr>';
        row1+= '<td>' + 
            key + '</td>';

        row1 += '<td>' + 
            value + '</td>';
        row1 += '</tr>';
        table.innerHTML += row1
    }
}

    

