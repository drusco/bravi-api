import express from 'express'
import bodyParser from "body-parser";
import controllers from './controllers'

export const api = express()

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

controllers.forEach(controller => controller(api))

api.use((req, res, next) => {
    res.status(404).json({
        code: 404,
        message: 'Not found'
    })
})

api.use((err, req, res, next) => {
    res.status(500).json({
        code: err.code || 500,
        message: err.message,
        stack: err.stack
    })
})
