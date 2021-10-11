import MongodbRepository from './Mongodb.repository'
import { mongodbConfig } from '../config/MongodbConfig'
import { ObjectId } from 'mongodb'

export default class DatabaseRepository {
  static async getMongoConnection () {
    return await MongodbRepository.connect(mongodbConfig)
  }

  static async getMongoDatabase () {
    const conn = await DatabaseRepository.getMongoConnection()
    return conn && conn.db
  }

  static async getMongoClient () {
    const conn = await DatabaseRepository.getMongoConnection()
    return conn && conn.client
  }

  static async disconnectMongoClient () {
    return await MongodbRepository.disconnect(await DatabaseRepository.getMongoConnection())
  }

  static async mongoGet (collection: string, id: string) {
    const db = await DatabaseRepository.getMongoDatabase()
    if (id) {
      return db && await db.collection(collection).findOne({ _id: new ObjectId(id) })
    }
    return db && await db.collection(collection).find().toArray()
  }

  static async mongoCreate (collection: string, object: object) {
    const db = await DatabaseRepository.getMongoDatabase()
    const row = db && await db.collection(collection).insertOne(object)
    return !!(row && row.insertedId)
  }

  static async mongoUpdate (collection: string, id: string, data: object) {
    const db = await DatabaseRepository.getMongoDatabase()
    const row = db && await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: data })
    return !!(row && row.modifiedCount)
  }

  static async mongoDelete (collection: string, id: string) {
    const db = await DatabaseRepository.getMongoDatabase()
    if (id) {
      const row = db && await db.collection(collection).deleteOne({ _id: new ObjectId(id) })
      return !!(row && row.deletedCount)
    }
    const deleted = db && db.collection(collection).deleteMany()
    return !!(deleted && deleted.deletedCount)
  }
}
