import PeopleRepository from "../repositories/People.repository";
const people = new PeopleRepository()

export default function PeopleController (api) {
    api.get('/people/get/:id?', people.get)
    api.post('/people/create', people.create)
    api.post('/people/update/:id', people.update)
    api.delete('/people/delete/:id?', people.delete)
}