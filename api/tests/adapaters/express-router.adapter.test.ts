import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'

import { AbstractController } from '@/controllers'
import { routerAdapter } from '@/adapters'
import { env } from '@/config/env'

describe('Express Router Adapter', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<AbstractController>
  let sut: RequestHandler

  const pathParamRequest = { property: 'any_property' }
  const bodyResponse = {
    code: 'any_code',
    message: 'any_message',
    data: {
      property: 'any_property'
    },
    debug: 'debug_message'
  }

  beforeAll(() => {
    req = getMockReq({ params: pathParamRequest })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      body: bodyResponse
    })
  })

  beforeEach(() => {
    sut = routerAdapter(controller)
  })

  test('Should call handle with correct values', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledTimes(1)
    expect(controller.handle).toHaveBeenCalledWith({ pathParams: pathParamRequest, queryParams: {} })
  })

  test('Should have property debug if node_env is different of production', async () => {
    env.NODE_ENV = 'development'

    await sut(req, res, next)

    expect(res.json).toHaveBeenCalledWith(bodyResponse)
  })

  test('Should not have property debug if node_env is production', async () => {
    env.NODE_ENV = 'production'

    await sut(req, res, next)

    expect(res.json).toHaveBeenCalledWith({
      code: 'any_code',
      message: 'any_message',
      data: {
        property: 'any_property'
      }
    })
    expect(bodyResponse).not.toHaveProperty('debug')

    env.NODE_ENV = 'test'
  })

  test('Should respond with same status code and body as controller response', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(bodyResponse)
  })

  test('Should have property error if status code is greater than 299', async () => {
    controller.handle.mockResolvedValueOnce(({
      statusCode: 400,
      body: {
        code: 'any_error_code',
        debug: 'any_error_debug',
        message: 'any_error_message'
      }
    }))

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      error: {
        code: 'any_error_code',
        debug: 'any_error_debug',
        message: 'any_error_message'
      }
    })
  })
})
