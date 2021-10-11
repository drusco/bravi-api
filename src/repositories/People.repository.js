import PeopleService from "../services/People.service";

export default class PeopleRepository {
    static async get (req, res, next) {
        const { params } = req
        res.json(await PeopleService.getPeople(params.id).catch(next))
    }
    static async create(req, res, next) {
        const { body } = req
        res.json(await PeopleService.createPerson(body).catch(next))
    }
    static async update(req, res, next) {
        const { body, params } = req
        res.json(await PeopleService.updatePerson(params.id, body).catch(next))
    }
    static async delete(req, res, next) {
        const { params } = req
        res.json(await PeopleService.deletePerson(params.id).catch(next))
    }
}