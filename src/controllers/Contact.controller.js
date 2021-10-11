import ContactRepository from "../repositories/Contact.repository";

export default function ContactController (api) {
    api.get('/people/get/:id?', ContactRepository.get)
    api.post('/people/create', ContactRepository.create)
    api.post('/people/update/:id', ContactRepository.update)
    api.delete('/people/delete/:id?', ContactRepository.delete)
}