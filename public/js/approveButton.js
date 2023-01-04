function show_hide(obj){
    obj.style.display="none";
    document.getElementById("clicked"+obj.id).style.display="inline";
    if(obj.id[0]=='a'){
        document.getElementById("r"+obj.id.slice(1)).style.display="none";      
    }
    else{
        document.getElementById("a"+obj.id.slice(1)).style.display="none";
    }
}


        