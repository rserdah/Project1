const uuid = require('uuid');

class Employee
{
    constructor({ username, password, role })
    {
        this.employeeId = uuid.v4();
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

module.exports = Employee;