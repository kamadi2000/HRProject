# HRProject
-----------------------------------------------------
post -> localhost:8000/login 

    request body
        username
        password
    
    response(200)
        accesstoken
        refreshtoken
        type

-----------------------------------------------------
post -> localhost:8000/token

    request body
        refreshtoken

    response(200)
        accesstoken

-----------------------------------------------------
delete -> localhost:8000/logout

    request body
        refrestoken

    response(204)

    