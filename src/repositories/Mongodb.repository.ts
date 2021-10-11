import { Db, MongoClient } from 'mongodb'
import { MongoConfig } from '../types/MongoConfig'
import { MongoConnection } from '../types/MongoConnection'
const connections = new WeakMap()

export default class MongodbRepository {
  static async connect (config: MongoConfig) {
    const { uri, database } = config
    let cache = connections.get(config)
    if (!cache) {
      cache = {}
      connections.set(config, cache)
    }
    if (cache.conn) return cache.conn
    if (!cache.promise) {
      const conn = <MongoConnection>{}
      cache.promise = MongoClient.connect(uri)
        .then((client: MongoClient) => {
          conn.client = client
          return client.db(database)
        })
        .then((db: Db) => {
          conn.db = db
          cache.conn = conn
        })
    }
    await cache.promise
    return cache.conn
  }

  static async disconnect (conn: MongoConnection) {
    if (conn && conn.client) {
      await conn.client.close()
    }
  }
}
