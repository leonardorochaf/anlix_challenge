import { serializeError } from 'serialize-error'

import { BadRequestError, NotFoundError } from '@/errors'

export type HttpRequest = {
  pathParams?: any
  queryParams?: any
  body?: any
}

export type HttpResponse = {
  statusCode: number
  body: BodyResponse
}

export type BodyResponse = {
  code: string
  message: string
  data?: any
  debug?: any
}

export const badRequest = (error: BadRequestError): HttpResponse => ({
  statusCode: 400,
  body: {
    code: error.name,
    message: error.message,
    debug: JSON.stringify(serializeError(error))
  }
})

export const serverError = (params: { code: string, message: string, error: any }): HttpResponse => ({
  statusCode: 500,
  body: {
    code: params.code,
    message: params.message,
    debug: JSON.stringify(serializeError(params.error))
  }
})

export const ok = (params: { code: string, message: string, data?: any }): HttpResponse => ({
  statusCode: 200,
  body: {
    code: params.code,
    message: params.message,
    data: params.data
  }
})

export const notFound = (error: NotFoundError): HttpResponse => ({
  statusCode: 404,
  body: {
    code: error.name,
    message: error.message,
    debug: JSON.stringify(serializeError(error))
  }
})
