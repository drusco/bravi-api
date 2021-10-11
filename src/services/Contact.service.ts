import DatabaseRepository from '../repositories/Database.repository'

export default class ContactService {
  static async get (req: any, res: any, next: any) {
    const { params } = req
    res.json(await DatabaseRepository.mongoGet('contact', params.id).catch(next))
  }

  static async create (req: any, res: any, next: any) {
    const { body } = req
    res.json(await DatabaseRepository.mongoCreate('contact', body).catch(next))
  }

  static async update (req: any, res: any, next: any) {
    const { body, params } = req
    res.json(await DatabaseRepository.mongoUpdate('contact', params.id, body).catch(next))
  }

  static async delete (req: any, res: any, next: any) {
    const { params } = req
    res.json(await DatabaseRepository.mongoDelete('contact', params.id).catch(next))
  }
}
