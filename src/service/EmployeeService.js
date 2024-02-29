const Service = require('./Service');
const employeeDao = require('../repository/dao/EmployeeDAO');
const logger = require('../util/Logger');
const { SALT_ROUNDS, SECRET_KEY } = require('../repository/secrets');
const bcrypt = require('bcrypt');

class EmployeeService extends Service {
// CREATE
    async createEmployee(employee) {
        if(!employee) {
            logger.error('400 Employee must not be null/undefined.');
            throw new Error('400 Employee must not be null/undefined.');
        }

        if(!employee.username) {
            logger.error('400 Employee must have a username.');
            throw new Error('400 Employee must have a username.');
        }

        // If an existing employee exists by the same username, respond with error
        if(await this.getEmployeeByUsername(employee.username)) {
            logger.error('409 Username taken.');
            throw new Error('409 Username taken.');
        }

        // Check username for whitespace
        if((/\s/g).test(employee.username)) {
            logger.error('400 Employee username cannot contain whitespace.');
            throw new Error('400 Employee username cannot contain whitespace.');
        }

        // If password is undefined or is empty after trimming it
        
        if(!employee.password || !employee.password.trim()) {
            logger.error('400 Employee must have a password.');
            throw new Error('400 Employee must have a password.');
        }

        employee.username = employee.username.trim();
        employee.password = employee.password.trim();

        employee.password = await bcrypt.hash(employee.password, SALT_ROUNDS);

        // Default role to employee if missing/invalid
        if(!employee.role || ((employee.role.trim() != 'employee') && (employee.role.trim() != 'financeManager'))) {
            employee.role = 'employee';
        }

        logger.info('200 Created employee.');
        return await employeeDao.createEmployee(employee);
    }

// READ
    async getEmployeeByUsername(username) {
        if(!username) {
            logger.error('Must specify a username');
            throw new Error('Must specify a username');
        }

        return await employeeDao.getEmployeeByUsername(username);
    }
// UPDATE


// DELETE

}

module.exports = new EmployeeService();