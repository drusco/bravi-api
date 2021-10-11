import MongodbService from "./Mongodb.service";

const mongodb = new MongodbService()
const { MONGODB_DATABASE, MONGODB_URI } = process.env

const connectionInfo = {
    uri: MONGODB_URI,
    database: MONGODB_DATABASE
}

export default class Service {
    private db;
    async constructor() {
        this.db = await mongodb.connect(connectionInfo)
    }
}