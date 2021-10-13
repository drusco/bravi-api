import { Express } from 'express'
import ContactService from '../services/Contact.service'
import { ContactModelExtended } from '../models/Contact.model'
import { celebrate, Segments } from 'celebrate'

export default function ContactController (api: Express) {
  api.get('/contact/get/:id?', ContactService.get)
  api.post('/contact/create', celebrate({ [Segments.BODY]: ContactModelExtended }), ContactService.create)
  api.put('/contact/update/:id', celebrate({ [Segments.BODY]: ContactModelExtended }), ContactService.update)
  api.delete('/contact/delete/:id?', ContactService.delete)
}
