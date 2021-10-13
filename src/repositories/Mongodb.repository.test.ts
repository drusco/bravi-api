import MongodbRepository from './Mongodb.repository'
import { MongoConfigType } from '../types/MongoConfig.type'
import { MongoConnectionType } from '../types/MongoConnection.type'
import { MongoClient } from 'mongodb'

describe('MongodbRepository test', () => {
  let connection: MongoConnectionType | undefined

  const connectionConfig: MongoConfigType = {
    uri: 'mongodb://example',
    database: 'sandbox'
  }

  it('Connects to mongodb', async () => {
    connection = await MongodbRepository.connect(connectionConfig)
    expect(MongoClient.connect).toHaveBeenCalledWith(connectionConfig.uri)
    expect(connection?.client.db).toHaveBeenCalledWith(connectionConfig.database)
    expect(connection).toMatchObject({ client: {}, db: {} })
  })

  it('Keeps connection in cache', async () => {
    const cachedConnection = <MongoConnectionType> await MongodbRepository.connect(connectionConfig)
    expect(cachedConnection).toBeTruthy()
    expect(cachedConnection === connection).toBeTruthy()
  })

  it('Closes a client connection', async () => {
    await MongodbRepository.disconnect(<MongoConnectionType>connection)
    const newConnection = <MongoConnectionType> await MongodbRepository.connect(connectionConfig)
    expect(newConnection === connection).toBeFalsy()
    expect(connection?.client.close).toHaveBeenCalled()
  })
})
