const Dao = require('./DAO');
const Employee = require('../class/Employee');
const { ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb"); //DocumentClient API allows for simpler syntax, so if this doesn't work try that

class EmployeeDao extends Dao {
    constructor() {
        super('Employee');
    }

// CREATE
    async createEmployee(employee) {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: employee
        });

        return await this.trySendCommand(command);
    }

// READ
    async getEmployeeByUsername(username) {
        const command = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: "#username = :username",
            ExpressionAttributeNames: {"#username": "username"},
            ExpressionAttributeValues: {':username': username}
        });
        
        let userArr = await this.trySendCommandItems(command);
        return userArr[0];
    }
}

module.exports = new EmployeeDao();