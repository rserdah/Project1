const Dao = require('./DAO');
const Ticket = require('../class/Ticket');
const { QueryCommand, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb"); //DocumentClient API allows for simpler syntax, so if this doesn't work try that

class TicketDao extends Dao {
    constructor() {
        super('Ticket');
    }

// CREATE
    async createTicket(ticket) {
        const newTicket = new Ticket({ amount: ticket.amount, author: ticket.author, description: ticket.description, type: ticket.type });

        //console.log(JSON.stringify(newTicket));

        const command = new PutCommand({
            TableName: this.tableName,
            Item: newTicket
            //Item: { amount: "0", author: "0", description: "", type: "" }
        });

        // Doesn't return the items because PutCommand's return doesn't include the items, it just includes the request result
        return await this.trySendCommand(command);
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

// UPDATE


// DELETE


}

module.exports = new TicketDao();