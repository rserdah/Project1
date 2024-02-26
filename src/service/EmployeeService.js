const Service = require('./Service');
const employeeDao = require('../repository/dao/EmployeeDAO');

class EmployeeService extends Service {
// CREATE
    createEmployee = async (employee) => await employeeDao.createEmployee(employee);

// READ
    getUserByUsername = async (username) => await employeeDao.getUserByUsername(username);
// UPDATE


// DELETE

}

module.exports = new EmployeeService();