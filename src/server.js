import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
export const api = express()

api.get('/', (req, res) => {
    res.send('Hello World!')
})

api.listen(process.env.PORT, () => {
    console.log(`Example app listeppning at http://localhost:${process.env.PORT}`)
})