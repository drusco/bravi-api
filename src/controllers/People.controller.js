import PeopleRepository from "../repositories/People.repository";

export default function PeopleController (api) {
    api.get('/people/get/:id?', PeopleRepository.get)
    api.post('/people/create', PeopleRepository.create)
    api.post('/people/update/:id', PeopleRepository.update)
    api.delete('/people/delete/:id?', PeopleRepository.delete)
}