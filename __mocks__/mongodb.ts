module.exports = {
  MongoClient: {
    connect: jest.fn().mockResolvedValue({
      db: jest.fn().mockResolvedValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray: jest.fn()
          }),
          insertMany: jest.fn(),
          updateMany: jest.fn(),
          deleteMany: jest.fn()
        })
      }),
      close: jest.fn()
    })
  }
}
