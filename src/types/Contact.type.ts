export interface ContactType {
    type: 'whatsapp' | 'email' | 'phone',
    data: string,
    personId: string
}
