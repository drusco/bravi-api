import { MongoConfigType } from '../types/MongoConfig.type'
const { MONGODB_DATABASE, MONGODB_URI } = process.env

export const mongodbConfig = <MongoConfigType>{
  uri: MONGODB_URI,
  database: MONGODB_DATABASE
}
