const express = require('express')

const app = express()
const port = 8000

app.get('/kamadi', (req, res) => {
    res.send('Hello World!')
})

require('./src/routes/employeeRoutes')(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})