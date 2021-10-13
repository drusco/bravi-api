import { MongoConnectionType } from '../types/MongoConnection.type'
import DatabaseRepository from './Database.repository'

describe('DatabaseRepository test', () => {
  const collection = 'testing'
  let connection: MongoConnectionType | undefined

  it('Gets a mongodb connection', async () => {
    connection = await DatabaseRepository.getMongoConnection()
    expect(connection).toMatchObject({ db: {}, client: {} })
  })

  it('Gets a mongodb database object', async () => {
    const db = await DatabaseRepository.getMongoDatabase()
    expect(db === connection?.db).toBeTruthy()
  })

  it('Gets a mongodb client object', async () => {
    const client = await DatabaseRepository.getMongoClient()
    expect(client === connection?.client).toBeTruthy()
  })

  it('Disconnects a client from a mongodb connection', async () => {
    await DatabaseRepository.disconnectMongoClient()
    const newConnection = await DatabaseRepository.getMongoConnection()
    expect(newConnection === connection).toBeFalsy()
  })

  it('[mongoGet] gets objects in a collection using mongodb.find', async () => {
    const results = await DatabaseRepository.mongoGet(collection)
    expect(Array.isArray(results)).toStrictEqual(true)
  })

  it('[mongoCreate] adds objects in a collection using mongodb.insertMany', async () => {
    const insertDocument = { document: true }
    const collectionObject = connection?.db.collection(collection)
    const result = await DatabaseRepository.mongoCreate(collection, insertDocument)
    expect(typeof result).toEqual('boolean')
    expect(collectionObject?.insertMany).toHaveBeenCalledWith(insertDocument)
  })

  it('[mongoUpdate] updates objects in a collection using mongodb.updateMany', async () => {
    const filter = { test: true }
    const update = { update: true }
    const collectionObject = connection?.db.collection(collection)
    const result = await DatabaseRepository.mongoUpdate(collection, filter, update)
    expect(typeof result).toEqual('boolean')
    expect(collectionObject?.updateMany).toHaveBeenCalledWith(filter, update)
  })

  it('[mongoDelete] deletes objects in a collection using mongodb.deleteMany', async () => {
    const args = [{ filter: true }, { options: true }]
    const collectionObject = connection?.db.collection(collection)
    const result = await DatabaseRepository.mongoDelete(collection, ...args)
    expect(typeof result).toEqual('boolean')
    expect(collectionObject?.deleteMany).toHaveBeenCalledWith(...args)
  })
})
