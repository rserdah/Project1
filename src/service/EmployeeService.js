const Service = require('./Service');
const employeeDao = require('../repository/dao/EmployeeDAO');

class EmployeeService extends Service {
// CREATE
    async createEmployee(employee) {
        return await employeeDao.createEmployee(employee);
    }

// READ
    async getUserByUsername(username) {
        return await employeeDao.getUserByUsername(username);
    }
// UPDATE


// DELETE

}

module.exports = new EmployeeService();