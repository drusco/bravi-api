import ContactService from "../services/Contact.service";

export default class ContactRepository {
    static async get (req, res, next) {
        const { params } = req
        res.json(await ContactService.getContact(params.id).catch(next))
    }
    static async create(req, res, next) {
        const { body } = req
        res.json(await ContactService.createContact(body).catch(next))
    }
    static async update(req, res, next) {
        const { body, params } = req
        res.json(await ContactService.updateContact(params.id, body).catch(next))
    }
    static async delete(req, res, next) {
        const { params } = req
        res.json(await ContactService.deleteContact(params.id).catch(next))
    }
}