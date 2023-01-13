const submitbtn = document.getElementById("signout");

submitbtn.addEventListener('click',()=>{
    localStorage.clear();
    location.href = '/loginPage';
} )