## Bravi Fullstack Developer Test

_Autor: Pedro Gallardo_

###
### Começo Rápido
###
#### Clonar projeto

* `git clone https://github.com/drusco/bravi-api.git`
* `cd bravi-api`

#### Rodar com o Docker (instalar docker previamente)

* `sudo docker-compose up -d`

##### Rodar migrations (opcional)

* `sudo docker-compose exec bravi-api npm run migrate up`

##### Rodar testes com jest

* `npm run test`



### **Backend**

[http://localhost:3000](http://localhost:3000)

* **Endpoints**

  - People
    - `GET` /people/get/:id?
    - `POST` /people/create
    - `PUT` /people/update/:id
    - `DELETE` /people/delete/:id?

  - Contacts
    - `GET` /contact/get/:personId?
    - `POST` /contact/create
    - `PUT` /contact/update/:id
    - `DELETE` /contact/delete/:id?

  
* **Mongodb URI**
`mongodb://bravi:TRV4654woskUdGf85@localhost:3001/?authSource=sandbox&readPreference=primary&directConnection=true&ssl=false`
