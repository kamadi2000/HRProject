module.exports = (app) => {
    var router = require('express').Router()
    const employeeController = require('../controllers/employeeController')

    router.get("/", employeeController.getEmployees)
    app.use("/employees", router)
}