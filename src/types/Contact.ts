export interface Contact {
    type: 'whatsapp' | 'email' | 'phone',
    data: string,
    personId: string
}
