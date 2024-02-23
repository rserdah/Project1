const Service = require('./Service');
const employeeDao = require('../repository/dao/EmployeeDAO');

class EmployeeService extends Service {
// CREATE

// READ
    getUserByUsername = async () => await employeeDao.getUserByUsername();
// UPDATE


// DELETE

}

module.exports = new EmployeeService();