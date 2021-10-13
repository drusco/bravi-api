import { ObjectId } from 'mongodb'
import { NextFunction, Request, Response } from 'express'
import DatabaseRepository from '../repositories/Database.repository'

export default class ContactService {
  static async get (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    let filter
    if (params.id) {
      if (!ObjectId.isValid(params.id)) return next(Object.assign(Error('ID is not valid'), { status: 406 }))
      filter = { _id: new ObjectId(params.id) }
    }
    res.json(await DatabaseRepository.mongoGet('contact', filter).catch(next))
  }

  static async create (req: Request, res: Response, next: NextFunction) {
    const { body } = req
    const objects = Array.isArray(body) ? body : [body]
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i]
      if (!ObjectId.isValid(object.personId)) {
        return next(Object.assign(Error(`Contact[${i}].personId is not valid`), { status: 400 }))
      }
    }
    res.json(await DatabaseRepository.mongoCreate('contact', objects).catch(next))
  }

  static async update (req: Request, res: Response, next: NextFunction) {
    const { body, params } = req
    if (!ObjectId.isValid(params.id)) return next(Object.assign(Error('ID is not valid'), { status: 400 }))
    res.json(await DatabaseRepository.mongoUpdate('contact', { _id: new ObjectId(params.id) }, { $set: body }).catch(next))
  }

  static async delete (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    if (!ObjectId.isValid(params.id)) return next(Object.assign(Error('ID is not valid'), { status: 400 }))
    res.json(await DatabaseRepository.mongoDelete('contact', { _id: new ObjectId(params.id) }).catch(next))
  }
}
