require('dotenv').config()
const { api } = require('./api')
const { PORT } = process.env

api.listen(PORT, () => console.log(`Bravi API http://localhost:${PORT}`))
