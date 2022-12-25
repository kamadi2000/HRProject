const express = require('express')

const employeeRoutes = require('./src/routes/employeeRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express()
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello!!! WELCOME JUPYTER')
})

app.use('/employee',employeeRoutes);
app.use('/auths',authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})