const employeeService = require('../src/service/EmployeeService');
const Employee = require('../src/repository/class/Employee');

describe("EmployeeService.createEmployee should return HTTP code ", () => {
    const createEmployeeNullEmployee = async () => { 
        await employeeService.createEmployee(null);
    };
    
    const createEmployeeNoUsername = async () => { await employeeService.createEmployee(new Employee({
        username: "",
        password: "123",
    })) };

    const createEmployeeExistingUsername = async () => { await employeeService.createEmployee(new Employee({
        username: "user1",
        password: "123",
    })) };

    const createEmployeeUsernameContainsWhitespace = async () => { await employeeService.createEmployee(new Employee({
        username: "John Doe",
        password: "123",
    })) };

    const createEmployeeUsernameNoPassword = async () => { await employeeService.createEmployee(new Employee({
        username: "uniqueUser",
        password: "",
    })) };

    const createEmployeePasswordIsOnlyWhitespace = async () => { await employeeService.createEmployee(new Employee({
        username: "uniqueUser",
        password: "      ",
    })) };


    test('400 when employee is null', async () => {
        await expect(createEmployeeNullEmployee).rejects.toThrow('400');
    });

    test('400 when employee has no username', async () => {
        await expect(createEmployeeNoUsername).rejects.toThrow('400');
    });

    test('409 when employee has existing username', async () => {
        await expect(createEmployeeExistingUsername).rejects.toThrow('409');
    });

    test('400 when employee username has whitespace', async () => {
        await expect(createEmployeeUsernameContainsWhitespace).rejects.toThrow('400');
    });

    test('400 when employee has no password', async () => {
        await expect(createEmployeeUsernameNoPassword).rejects.toThrow('400');
    });

    test('400 when employee password is only whitespace', async () => {
        await expect(createEmployeePasswordIsOnlyWhitespace).rejects.toThrow('400');
    });
});

describe("EmployeeService.getEmployeeByUsername should ", () => {
    test('throw an error when username is falsy', async () => {
        const getEmployeeByUsername_FalsyUsername = async () => {
            await employeeService.getEmployeeByUsername('');
        };

        await expect(getEmployeeByUsername_FalsyUsername).rejects.toThrow('Must specify a username');
    });
});