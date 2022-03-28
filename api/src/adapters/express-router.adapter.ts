import { Request, RequestHandler, Response } from 'express'

import { AbstractController } from '@/controllers'
import { HttpRequest } from '@/helpers'
import { env } from '@/config/env'

export const routerAdapter = (contoller: AbstractController): RequestHandler => async (req: Request, res: Response) => {
  const request: HttpRequest = {
    pathParams: req.params,
    queryParams: req.query
  }

  const { statusCode, body } = await contoller.handle(request)

  if (env.NODE_ENV === 'production') {
    delete body.debug
  }

  if (statusCode >= 200 && statusCode < 300) {
    res.status(statusCode).json(body)
  } else {
    res.status(statusCode).json({
      error: body
    })
  }
}
