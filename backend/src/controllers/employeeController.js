const employeeModel = require("../models/employeeModel")

exports.getEmployees = (req, res) => {
    employeeModel.queryEmployees((result) => {
        res.send(result)
    })
}