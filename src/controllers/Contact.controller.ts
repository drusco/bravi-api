import { Express } from 'express'
import ContactService from '../services/Contact.service'

export default function ContactController (api: Express) {
  api.get('/contact/get/:id?', ContactService.get)
  api.post('/contact/create', ContactService.create)
  api.post('/contact/update/:id', ContactService.update)
  api.delete('/contact/delete/:id?', ContactService.delete)
}
