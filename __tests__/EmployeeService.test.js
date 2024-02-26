const employeeDao = require('../src/repository/dao/EmployeeDAO');
jest.mock('../src/repository/dao/EmployeeDAO');
const employeeService = require('../src/service/EmployeeService');
const Employee = require('../src/repository/class/Employee');


test('EmployeeService.createEmployee should return HTTP code 200', async () => {
// Arrange
    const e = new Employee({
        employeeId: '777',
        username: 'mockUser',
        password: '123',
        role: 'employee'
    });

    const mockResponse = {"$metadata":{"httpStatusCode":200,"requestId":"5FTGU3NQHBI00R9E3OKQ7RF2KBVV4KQNSO5AEMVJF66Q9ASUAAJG","attempts":1,"totalRetryDelay":0}};

    employeeDao.createEmployee.mockResolvedValueOnce(mockResponse);

// Act
    const response = await employeeService.createEmployee(e);

// Assert
    expect(response.$metadata.httpStatusCode).toBe(200);
});