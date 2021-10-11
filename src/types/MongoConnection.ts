import { Db, MongoClient } from 'mongodb'

export interface MongoConnection {
    db: Db,
    client: MongoClient
}
