import PeopleService from '../services/People.service'

export default function PeopleController (api: any) {
  api.get('/people/get/:id?', PeopleService.get)
  api.post('/people/create', PeopleService.create)
  api.post('/people/update/:id', PeopleService.update)
  api.delete('/people/delete/:id?', PeopleService.delete)
}