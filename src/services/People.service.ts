import DatabaseRepository from '../repositories/Database.repository'

export default class PeopleService {
  static async get (req: any, res: any, next: any) {
    const { params } = req
    res.json(await DatabaseRepository.mongoGet('people', params.id).catch(next))
  }

  static async create (req: any, res: any, next: any) {
    const { body } = req
    res.json(await DatabaseRepository.mongoCreate('people', body).catch(next))
  }

  static async update (req: any, res: any, next: any) {
    const { body, params } = req
    res.json(await DatabaseRepository.mongoUpdate('people', params.id, body).catch(next))
  }

  static async delete (req: any, res: any, next: any) {
    const { params } = req
    res.json(await DatabaseRepository.mongoDelete('people', params.id).catch(next))
  }
}
