const uuid = require('uuid');

class Employee
{
    constructor({ employeeId, role, username, password })
    {
        this.employeeId = uuid.v4();
        this.role = role;
        this.username = username;
        this.password = password;
    }
}

module.exports = Employee;