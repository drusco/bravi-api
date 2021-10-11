import ContactService from '../services/Contact.service'

export default function ContactController (api: any) {
  api.get('/people/get/:id?', ContactService.get)
  api.post('/people/create', ContactService.create)
  api.post('/people/update/:id', ContactService.update)
  api.delete('/people/delete/:id?', ContactService.delete)
}
