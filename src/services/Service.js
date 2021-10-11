import MongodbService from "./Mongodb.service";

const mongodb = new MongodbService()
const { MONGODB_DATABASE, MONGODB_URI } = process.env

const connectionInfo = {
    uri: MONGODB_URI,
    database: MONGODB_DATABASE
}

export default class Service {
    async getMongoConnection() {
        return await mongodb.connect(connectionInfo)
    }
    async getMongoDatabase() {
        const conn = await this.getMongoConnection()
        return conn && conn.db
    }
    async getMongoClient() {
        const conn = await this.getMongoConnection()
        return conn && conn.client
    }
}
