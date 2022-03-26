import { mock } from 'jest-mock-extended'

import { AbstractController } from '@/controllers'
import { HttpRequest, HttpResponse } from '@/helpers'
import { IValidator } from '@/validation'
import { ValidationError } from '@/errors'

class ControllerStub extends AbstractController {
  result: HttpResponse = {
    statusCode: 200,
    body: {
      code: 'any_code',
      message: 'any_message',
      data: {}
    }
  }

  async perform (request: HttpRequest): Promise<HttpResponse> {
    return this.result
  }
}

describe('Abstract Controller', () => {
  const request: HttpRequest = {
    pathParams: {
      pathParam: 'any_path_param'
    },
    queryParams: {
      queryParam: 'any_query_param'
    },
    body: {
      property: 'any_data'
    }
  }

  let sut: ControllerStub
  const validator = mock<IValidator>()

  beforeAll(() => {
    validator.validate.mockResolvedValue(null)
  })

  beforeEach(() => {
    sut = new ControllerStub(validator)
  })

  test('Should not call validator if its not passed as dependency', async () => {
    sut = new ControllerStub()

    await sut.handle(request)

    expect(validator.validate).toHaveBeenCalledTimes(0)
  })

  test('Should call validator with correct values', async () => {
    await sut.handle(request)

    expect(validator.validate).toHaveBeenCalledTimes(1)
    expect(validator.validate).toHaveBeenCalledWith({ ...request.pathParams, ...request.queryParams, ...request.body })
  })

  test('Should return 400 if validator returns a ValidationError', async () => {
    validator.validate.mockResolvedValueOnce(new ValidationError([]))

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('code', 'ValidationError')
    expect(response.body).toHaveProperty('message', 'Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.')
  })

  test('Should return 500 if validator throws', async () => {
    validator.validate.mockRejectedValueOnce(new Error())

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('code', 'ServerError')
    expect(response.body).toHaveProperty('message', 'Ops! Ocorreu um erro. Por favor, tente novamente mais tarde.')
  })

  test('Should call perform with correct values', async () => {
    const mockSpy = jest.spyOn(sut, 'perform')

    await sut.handle(request)

    expect(mockSpy).toHaveBeenCalledTimes(1)
    expect(mockSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 500 if perform throws', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(new Error())

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('code', 'ServerError')
    expect(response.body).toHaveProperty('message', 'Ops! Ocorreu um erro. Por favor, tente novamente mais tarde.')
  })

  test('Should return the same value of perform on success', async () => {
    const response = await sut.handle(request)

    expect(response).toEqual(sut.result)
  })
})
