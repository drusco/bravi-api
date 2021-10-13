import express, { NextFunction, Request, Response } from 'express'
import controllers from './controllers'
import { isCelebrateError } from 'celebrate'

const dev = process.env.NODE_ENV === 'development'
export const api = express()

api.use(express.json())
controllers.forEach(controller => controller(api))

api.use((req: Request, res: Response, next: NextFunction) => {
  next(Object.assign(Error('Not found'), { status: 404 }))
})

api.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const validationError = isCelebrateError(err)
  const code = validationError ? 400 : (err.code || err.status || 500)

  res.status(err.status || 500)
  if (!err.message) return res.end()

  let details: any[] = []
  if (validationError) {
    details = Array.from(err.details).map(([source, error]) => ({ source, details: error.details.map(detail => detail.message) }))
  }

  res.json({
    code,
    message: err.message,
    stack: dev ? err.stack : undefined,
    validation: validationError && details.length ? details : undefined
  })
})
