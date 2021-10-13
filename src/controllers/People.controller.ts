import { Express } from 'express'
import PeopleService from '../services/People.service'
import { PersonModelExtended } from '../models/Person.model'
import { celebrate, Segments } from 'celebrate'

export default function PeopleController (api: Express) {
  api.get('/people/get/:id?', PeopleService.get)
  api.post('/people/create', celebrate({ [Segments.BODY]: PersonModelExtended }), PeopleService.create)
  api.put('/people/update/:id', celebrate({ [Segments.BODY]: PersonModelExtended }), PeopleService.update)
  api.delete('/people/delete/:id?', PeopleService.delete)
}
