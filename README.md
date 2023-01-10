# HRProject
-----------------------

INSTALLATION
--------------

Open command line and run the following commands to setup
1. `git clone https://github.com/kamadi2000/HRProject.git`
2. `cd HRProject`

To install backend
1. `npm start`
2. Frontend running at localhost:8000


RUN
--------

Start backend
1. `npm start`


ROUTES
---------------------------
User Routes.
1.`/viewleavecount`
Get the remaining leave count of each employee.
An array containing leaves responding to each leave type will be returned from backend.

2.`/applyleave`
Apply a leave by an employee.
If the leave request was successfully sent and there are remaining leaves from the type requested. Then a message is sent from backend saying that 'request was successfully sent'.If there are no remaining leaves from the requested type 'you have no leaves' message will be sent.If the request sent was incomplete 'incomplete request' message will be sent.

3.`/viewrequest`
Supervisor can view leave requests of employees.
An array containing leave details will be passed with the status as pending.

4.`/leavestatus`
Return the leaves that the employee has taken so far.
Pass an array containing all the leave details of the employee.

5.`/requestvalidation`
If the Supervisor approve the leave then return the leave status and a message as "successfully validated".

6.`/checkrecords`
Return all the records related to an employee.
when an valid employee id is given it returns all the employee datials and emergency details related to that employee. If an invalid employee id is given it returns a message as "Invalid employee ID".

7.`/emergancydetail`
 Return all the emergency detaials related to the given employee ID.

8.`/givepermission`
Changing access level users.
check whether the input employee ID is valid . If it is invalid returns a message as "Invalid employee ID". If an access level above 3 is selected then return a message as "Invalid access level".Update the access level of the user.

9.`/viewpim`
Return all the records related to an employee.
when an valid employee id is given it returns all the employee datials and emergency details related to that employee. If an invalid employee id is given it returns a message as "Invalid employee ID".

10.`/createuseraccount`
Create a new user account
create a new user record in table.
check whether the confirm password is matching if not return message:"confirm password is not matched".
check whether the user already exist.If not then update the tables with user details

11.`/createhraccount`
Create a new hr account
create a new record in table.
check whether the confirm password is matching if not return message:"confirm password is not matched".
check whether the HR account already exist. If not then update the tables with user details.

12.`/deleteaccount`
remove an employee records related to an employee from the database.
Check if the employee ID is valid , If it is valid delete all the records related to that employee ID. only HR manager has the permission for this.

13.`/deletehraccount`
remove HR account from the database.
delete all the records related to the HR manager from the database.

14.`/editemployeebyuser`
Edit employee details.
check whether the passed data are valid.If it is valid update the employee table and send a message "successfully updated".

15.`/editemergancybyuser`
edit emergency details.
check whether the passed data are valid.If valid update the emergency_detail table and send a message "successfully updated"

16.`/editemployeebyhr`
Edit employee details only by HR manager
check whether the passed data are valid.If valid update the employee table and send a message "successfully updated".

17.`/editemergancybyhr`
Edit emergency details only by HR manager.check whether the passed data are valid.If valid update the employee table and send a message "successfully updated".

18.`/changepassword`
change the password of an account
check whether the confirm password is matching if not return message:"confirm password is not matched"
If the employee ID is valid update the password in the user table.

19.`/addEmployee`
Add a new employee accout
create a new record with employee details.
Add all the PIM informations related to the employee.

20.`/addHr`
Add a new HR account.Only the admin da do this.
Create a new record with employee details.Add all the PIM informations related to the HR manager.

-------------------------------------------------------
ReportRoutes

1.`/reportemployee`
Get a reprot including all the details about the employees in a department.

2.`/reportleave`
get a report including all the details about total leaves given in a period of time by a single department.

3.`/reportemployee/jobtitle`
Get employee reports grouped by job title.

4.`/reportemployee/department`
Get employee reports grouped by department.

5.`/reportemployee/paygrade`
Get employee reports grouped by paygrade.


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

    