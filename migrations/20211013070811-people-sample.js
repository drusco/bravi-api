const ids = [
  '61666cc8e5453d13a855b5b6',
  '61667288e1db6e0bf53f307f',
  '616672c7768667baa482000a'
]

const people = [
  {
    _id: ids[0],
    name: 'Eduardo Santos Costa',
    city: 'Campo Grande, MS'
  },
  {
    _id: ids[1],
    name: 'Letícia Oliveira Correia',
    city: 'Salvador, BA'
  },
  {
    _id: ids[2],
    name: 'Isabela Santos Araujo',
    city: 'Campina Grande, PB'
  }
]

const contacts = [
  {
    personId: ids[0],
    type: 'phone',
    value: '+55-955-529-22503'
  },
  {
    personId: ids[1],
    type: 'phone',
    value: '+55-955-560-01458'
  },
  {
    personId: ids[2],
    type: 'whatsapp',
    value: '+55-955-050-75004'
  },
  {
    personId: ids[0],
    type: 'email',
    value: 'me1936@dayrep.com'
  },
  {
    personId: ids[1],
    type: 'email',
    value: 'himokag659@omibrown.com'
  },
  {
    personId: ids[2],
    type: 'email',
    value: 'hello@companyok.com'
  }
]

module.exports = {
  async up (db, client) {
    await db.collection('people').insertMany(people)
    await db.collection('contact').insertMany(contacts)
  },

  async down (db, client) {
    await db.collection('people').deleteMany({ _id: { $in: ids } })
    await db.collection('contact').deleteMany({ personId: { $in: ids } })
  }
}
