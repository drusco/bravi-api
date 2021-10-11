import MongodbService from "./Mongodb.service";
import {ObjectId} from "mongodb";

const mongodb = new MongodbService()
const { MONGODB_DATABASE, MONGODB_URI } = process.env

const connectionInfo = {
    uri: MONGODB_URI,
    database: MONGODB_DATABASE
}

export default class Service {
    static async getMongoConnection() {
        return await mongodb.connect(connectionInfo)
    }
    static async getMongoDatabase() {
        const conn = await Service.getMongoConnection()
        return conn && conn.db
    }
    static async getMongoClient() {
        const conn = await Service.getMongoConnection()
        return conn && conn.client
    }
    static async get (collection, id) {
        const db = await Service.getMongoDatabase()
        if (id) {
            return db && await db.collection(collection).findOne({ _id: ObjectId(id) })
        }
        return db && await db.collection(collection).find().toArray()
    }
    static async create(collection, object) {
        const db = await Service.getMongoDatabase()
        const row = db && await db.collection(collection).insertOne(object)
        return !!(row && row.insertedId)
    }
    static async update(collection, id, data) {
        const db = await Service.getMongoDatabase()
        const row = db && await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data })
        return !!(row && row.modifiedCount)
    }
    static async delete(collection, id) {
        const db = await Service.getMongoDatabase()
        if (id) {
            const row = db && await db.collection(collection).deleteOne({ _id: ObjectId(id) })
            return !!(row && row.deletedCount)
        }
        const deleted = db && db.collection(collection).remove()
        return !!(deleted && deleted.deletedCount)
    }
}
