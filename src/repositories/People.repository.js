import PeopleService from "../services/People.service";
const people = new PeopleService()

export default class PeopleRepository {
    async get (req, res, next) {
        const { params } = req
        res.json(await people.get(params.id).catch(next))
    }
    async create(req, res, next) {
        const { body } = req
        res.json(await people.create(body).catch(next))
    }
    async update(req, res, next) {
        const { body, params } = req
        res.json(await people.update(params.id, body).catch(next))
    }
    async delete(req, res, next) {
        const { params } = req
        res.json(await people.delete(params.id).catch(next))
    }
}