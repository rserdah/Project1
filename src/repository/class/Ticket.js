const uuid = require('uuid');

class Ticket
{
    constructor({amount, author, description, type})
    {
        this.ticketId = uuid.v4();
        this.submissionTime = Math.floor(Date.now() / 1000);
        this.amount = amount;
        this.author = author;
        this.description = description;
        this.type = type;
    }
}

module.exports = Ticket;