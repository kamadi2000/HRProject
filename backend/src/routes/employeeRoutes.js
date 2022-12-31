const {Router} = require('express');
const employeeController = require('../controllers/employeeController');

const router = Router();
//router.use("/employees", Router);

router.get("/", employeeController.getEmployees);

module.exports = router;