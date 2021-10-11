import Service from "./Service";

export default class PeopleService extends Service {
    constructor() {
        super();
    }
    async get (id) {
        const db = await this.getMongoDatabase()
        const people = db && await db.collection('people').find({})
        return []
    }
    async create(person) {
        const db = await this.getMongoDatabase()
        const insert = db && await db.collection('people').insertOne(person)
        return insert
    }
    async update() {

    }
    async delete() {

    }
}