import { ObjectId } from 'mongodb'
import { NextFunction, Request, Response } from 'express'
import DatabaseRepository from '../repositories/Database.repository'

export default class PeopleService {
  static async get (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    let filter
    if (params.id) {
      if (!ObjectId.isValid(params.id)) return next(Object.assign(Error('ID is not valid'), { status: 406 }))
      filter = { _id: new ObjectId(params.id) }
    }
    res.json(await DatabaseRepository.mongoGet('people', filter).catch(next))
  }

  static async create (req: Request, res: Response, next: NextFunction) {
    const { body } = req
    const objects = Array.isArray(body) ? body : [body]
    res.json(await DatabaseRepository.mongoCreate('people', objects).catch(next))
  }

  static async update (req: Request, res: Response, next: NextFunction) {
    const { body, params } = req
    if (!ObjectId.isValid(params.id)) return next(Object.assign(Error('ID is not valid'), { status: 406 }))
    res.json(await DatabaseRepository.mongoUpdate('people', { _id: new ObjectId(params.id) }, { $set: body }).catch(next))
  }

  static async delete (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    if (!ObjectId.isValid(params.id)) return next(Object.assign(Error('ID is not valid'), { status: 406 }))
    const personId = new ObjectId(params.id)
    await DatabaseRepository.mongoDelete('contact', { personId }).catch(next)
    res.json(await DatabaseRepository.mongoDelete('people', { _id: personId }).catch(next))
  }
}
