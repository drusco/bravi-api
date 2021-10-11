import express from 'express'
import controllers from './controllers'

export const api = express()

api.use(express.json())
controllers.forEach(controller => controller(api))

api.use((req: any, res: any, next: any) => {
  res.status(404).json({
    code: 404,
    message: 'Not found'
  })
})

api.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({
    code: err.code || 500,
    message: err.message,
    stack: err.stack
  })
})
