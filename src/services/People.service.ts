import { NextFunction, Request, Response } from 'express'
import DatabaseRepository from '../repositories/Database.repository'

export default class PeopleService {
  static async get (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    res.json(await DatabaseRepository.mongoGet('people', params.id).catch(next))
  }

  static async create (req: Request, res: Response, next: NextFunction) {
    const { body } = req
    res.json(await DatabaseRepository.mongoCreate('people', body).catch(next))
  }

  static async update (req: Request, res: Response, next: NextFunction) {
    const { body, params } = req
    res.json(await DatabaseRepository.mongoUpdate('people', params.id, body).catch(next))
  }

  static async delete (req: Request, res: Response, next: NextFunction) {
    const { params } = req
    res.json(await DatabaseRepository.mongoDelete('people', params.id).catch(next))
  }
}
