import Service from "./Service";

export default class PeopleService extends Service {
    constructor() {
        super();
    }
    static async getPeople (id) {
        return await Service.get('people', id)
    }
    static async createPerson(person) {
        return await Service.create('people', person)
    }
    static async updatePerson(id, data) {
        return await Service.update('people', id, data)
    }
    static async deletePerson(id) {
        return await Service.delete('people', id)
    }
}