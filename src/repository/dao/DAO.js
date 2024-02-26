const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

class Dao {
    static TableNamespace = 'Project1';
    static TableNamespaceSeparator = '_';

    constructor(tableName) {
        this.tableName = `${Dao.TableNamespace}${Dao.TableNamespaceSeparator}${tableName}`;
        this.client = new DynamoDBClient({ region: "us-east-2" }); //Maybe can make static instead?
        this.documentClient = DynamoDBDocumentClient.from(this.client); //Maybe can make static instead?
    }


    trySendCommandItems = async(command) => { let data = await this.trySendCommand(command); return data ? data.Items : null; }

    async trySendCommand(command)
    {
        try {
            const data = await this.documentClient.send(command);
            return data;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }
}

module.exports = Dao;