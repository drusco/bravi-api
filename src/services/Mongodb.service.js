import { MongoClient } from 'mongodb'
const connections = new WeakMap()

export default class MongodbService {
    async connect(connectionInfo) {
        if (!connectionInfo || typeof connectionInfo !== 'object') {
            throw Error('connectInfo not valid')
        }
        const { uri, database } = connectionInfo
        let cache = connections.get(connectionInfo)
        if (!cache) {
            cache = {}
            connections.set(connectionInfo, cache)
        }
        if (cache.conn) return cache.conn
        if (!cache.promise) {
            const conn = {}
            cache.promise = MongoClient.connect(uri)
                .then((client) => {
                    conn.client = client
                    return client.db(database)
                })
                .then((db) => {
                    conn.db = db
                    cache.conn = conn
                })
        }
        await cache.promise
        return cache.conn
    }
    async disconnect(conn) {
        if (conn && conn.client) {
            await conn.client.close()
        }
    }
}