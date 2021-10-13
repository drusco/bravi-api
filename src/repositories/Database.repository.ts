import MongodbRepository from './Mongodb.repository'
import { mongodbConfig } from '../config/MongodbConfig'

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
    const conn = await DatabaseRepository.getMongoConnection()
    conn && await MongodbRepository.disconnect(conn)
  }

  static async mongoGet (collection: string, ...args: any) {
    const db = await DatabaseRepository.getMongoDatabase()
    // @ts-ignore
    return (db && await db.collection(collection).find(...args).toArray()) || []
  }

  static async mongoCreate (collection: string, ...args: any) {
    const db = await DatabaseRepository.getMongoDatabase()
    // @ts-ignore
    const row = db && await db.collection(collection).insertMany(...args)
    return !!(row && row.insertedCount)
  }

  static async mongoUpdate (collection: string, ...args: any) {
    const db = await DatabaseRepository.getMongoDatabase()
    // @ts-ignore
    const row = db && await db.collection(collection).updateMany(...args)
    return !!(row && row.modifiedCount)
  }

  static async mongoDelete (collection: string, ...args: any) {
    const db = await DatabaseRepository.getMongoDatabase()
    // @ts-ignore
    const deleted = db && await db.collection(collection).deleteMany(...args)
    return !!(deleted && deleted.deletedCount)
  }
}
