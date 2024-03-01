const Dao = require('./DAO');
const Ticket = require('../class/Ticket');
const { ScanCommand, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb"); //DocumentClient API allows for simpler syntax, so if this doesn't work try that

class TicketDao extends Dao {
    constructor() {
        super('Ticket');
    }

// CREATE
    async createTicket(ticket) {
        const newTicket = new Ticket({ amount: ticket.amount, author: ticket.author, description: ticket.description });

        const command = new PutCommand({
            TableName: this.tableName,
            Item: newTicket
        });

        await this.trySendCommand(command);
        
        return newTicket;
    }

// READ
    async getAllTickets() {
        const command = new ScanCommand({
            TableName: this.tableName
        });

        return await this.trySendCommandItems(command);
    }

    async getTicketById(ticketId) {
        const command = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: "#ticketId = :ticketId",
            ExpressionAttributeNames: {"#ticketId": "ticketId"},
            ExpressionAttributeValues: {':ticketId': ticketId}
        });

        return await this.trySendCommandItems(command);
    }

    async getTicketsByAuthorId(author) {
        const command = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: "#author = :author",
            ExpressionAttributeNames: {"#author": "author"},
            ExpressionAttributeValues: {':author': author}
        });
    
        return await this.trySendCommandItems(command);
    }
    
    async getPendingTickets() {
        const command = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: "#status = :status",
            ExpressionAttributeNames: {"#status": "status"},
            ExpressionAttributeValues: {':status': 'pending'}
        });
    
        return await this.trySendCommandItems(command);
    }
// UPDATE
    async setTicketStatus(ticketId, newStatus, resolverEmployeeId) {
        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { "ticketId": ticketId },
            UpdateExpression: "set #status = :newStatus, #resolver = :newResolver",
            ExpressionAttributeNames: {"#status": "status", "#resolver": "resolver"},
            ExpressionAttributeValues: {":newStatus": newStatus, ":newResolver": resolverEmployeeId},
            ReturnValues: "ALL_NEW",
        });

        return await this.trySendCommand(command);
    }

// DELETE


}

module.exports = new TicketDao();