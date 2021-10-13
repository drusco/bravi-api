import { Db, MongoClient } from 'mongodb'

export interface MongoConnectionType {
    db: Db,
    client: MongoClient
}
