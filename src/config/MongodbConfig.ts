import { MongoConfig } from '../types/MongoConfig'
const { MONGODB_DATABASE, MONGODB_URI } = process.env

export const mongodbConfig = <MongoConfig>{
  uri: MONGODB_URI,
  database: MONGODB_DATABASE
}
