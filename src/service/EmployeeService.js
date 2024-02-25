const Service = require('./Service');
const employeeDao = require('../repository/dao/EmployeeDAO');

class EmployeeService extends Service {
// CREATE

// READ
    getUserByUsername = async (username) => await employeeDao.getUserByUsername(username);
// UPDATE


// DELETE

}

module.exports = new EmployeeService();