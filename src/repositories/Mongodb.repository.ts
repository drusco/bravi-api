import { Db, MongoClient } from 'mongodb'
import { MongoConfigType } from '../types/MongoConfig.type'
import { MongoConnectionType } from '../types/MongoConnection.type'
const connections = new WeakMap()

export default class MongodbRepository {
  static async connect (config: MongoConfigType) {
    const { uri, database } = config
    const connection: MongoConnectionType = connections.get(config)

    if (connection) return connection

    const client = await MongoClient.connect(uri)

    if (!client) return

    const db: Db = await client.db(database)
    const conn: MongoConnectionType = { db, client }

    connections.set(config, conn)
    connections.set(conn, config)
    return conn
  }

  static async disconnect (conn: MongoConnectionType) {
    await conn.client.close()
    connections.delete(connections.get(conn))
    connections.delete(conn)
  }
}
