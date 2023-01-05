const express = require('express')
const path = require('path')
const mysql = require('mysql')

const { viewController } = require('../backend/src/controllers/ViewController');
const { leaveTriggerController } = require('../backend/src/controllers/leaveTriggerController');

//const bodyParser = require('body-parser')

const employeeRoutes = require('./src/routes/employeeRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/thamindu');
const { post } = require('./src/routes/employeeRoutes');
const pageRoutes = require('./src/routes/pageRoutes');
const yasiraRoutes = require('./src/routes/yasira');
const ReportRoutes = require('./src/routes/ReportRoutes');
const controllerLeave = new leaveTriggerController();
const app = express()
const port = 8000;

app.use(async(req,res,next)=>{
    try{
        await controllerLeave.leaveTrigger();
        const controllerView = new viewController();
        await controllerView.createView();
        next() 
    }catch(e){
        console.log(e)
    }
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let initialPath = path.join(__dirname,"../public");
app.use(express.static(initialPath));

app.use('/employee',employeeRoutes);
app.use('/auths',authRoutes);
app.use('/user',userRoutes);
app.use('', pageRoutes);
app.use('/yasira',yasiraRoutes);
app.use('/reports',ReportRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})