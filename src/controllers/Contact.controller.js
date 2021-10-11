import ContactRepository from "../repositories/Contact.repository";
const contact = new ContactRepository()

export default function ContactController (api) {
    api.get('/people/get/:id?', contact.get)
    api.post('/people/create', contact.create)
    api.post('/people/update/:id', contact.update)
    api.delete('/people/delete/:id?', contact.delete)
}