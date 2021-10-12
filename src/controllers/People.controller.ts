import { Express } from 'express'
import PeopleService from '../services/People.service'

export default function PeopleController (api: Express) {
  api.get('/people/get/:id?', PeopleService.get)
  api.post('/people/create', PeopleService.create)
  api.put('/people/update/:id', PeopleService.update)
  api.delete('/people/delete/:id?', PeopleService.delete)
}
