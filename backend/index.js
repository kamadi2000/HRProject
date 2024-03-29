const express = require('express')
const path = require('path')
const mysql = require('mysql')
//const bodyParser = require('body-parser')

const employeeRoutes = require('./src/routes/employeeRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/thamindu');
const { post } = require('./src/routes/employeeRoutes');
const pageRoutes = require('./src/routes/pageRoutes');
const yasiraRoutes = require('./src/routes/yasira');
const app = express()
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let initialPath = path.join(__dirname,"../public");
app.use(express.static(initialPath));

app.use('/employee',employeeRoutes);
app.use('/auths',authRoutes);
app.use('/user',userRoutes);
app.use('', pageRoutes);
app.use('/yasira');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})