import Service from "./Service";

export default class ContactService extends Service {
    constructor() {
        super();
    }
    static async getContact (id) {
        return await Service.get('contact', id)
    }
    static async createContact(person) {
        return await Service.create('contact', person)
    }
    static async updateContact(id, data) {
        return await Service.update('contact', id, data)
    }
    static async deleteContact(id) {
        return await Service.delete('contact', id)
    }
}