import { NextFunction, Request, Response } from 'express'
import DatabaseRepository from '../repositories/Database.repository'
import { ObjectId } from 'mongodb'

export default class ContactService {
  static async get (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    res.json(await DatabaseRepository.mongoGet('contact', { _id: new ObjectId(params.id) }).catch(next))
  }

  static async create (req: Request, res: Response, next: NextFunction) {
    const { body } = req
    const objects = Array.isArray(body) ? body : [body]
    res.json(await DatabaseRepository.mongoCreate('contact', objects).catch(next))
  }

  static async update (req: Request, res: Response, next: NextFunction) {
    const { body, params } = req
    res.json(await DatabaseRepository.mongoUpdate('contact', { _id: new ObjectId(params.id) }, { $set: body }).catch(next))
  }

  static async delete (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    res.json(await DatabaseRepository.mongoDelete('contact', { _id: new ObjectId(params.id) }).catch(next))
  }
}
