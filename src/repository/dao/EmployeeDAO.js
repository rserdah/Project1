const Dao = require('./DAO');
const Employee = require('../class/Employee');
const { QueryCommand, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb"); //DocumentClient API allows for simpler syntax, so if this doesn't work try that

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
    async getUserByUsername(username) {
        const command = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: "#username = :username",
            ExpressionAttributeNames: {"#username": "username"},
            ExpressionAttributeValues: {':username': username}
        });
        
        let userArr = await this.trySendCommandItems(command);
        return userArr[0];
    }

// UPDATE


// DELETE

}

module.exports = new EmployeeDao();