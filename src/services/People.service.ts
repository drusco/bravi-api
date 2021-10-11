import { ObjectId } from 'mongodb'
import { NextFunction, Request, Response } from 'express'
import DatabaseRepository from '../repositories/Database.repository'

export default class PeopleService {
  static async get (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    let filter
    try {
      if (params.id) {
        filter = { _id: new ObjectId(params.id) }
      }
    } catch (err) {
      return next(err)
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
    let filter
    try {
      filter = { _id: new ObjectId(params.id) }
    } catch (err) {
      return next(err)
    }
    res.json(await DatabaseRepository.mongoUpdate('people', filter, { $set: body }).catch(next))
  }

  static async delete (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    let filter
    try {
      filter = { _id: new ObjectId(params.id) }
    } catch (err) {
      return next(err)
    }
    res.json(await DatabaseRepository.mongoDelete('people', filter).catch(next))
  }
}
