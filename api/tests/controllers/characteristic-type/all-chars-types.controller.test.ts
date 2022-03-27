import { mock } from 'jest-mock-extended'

import { AllCharacteristicTypesController } from '@/controllers/characteristic-type'
import { CharacteristicTypeDTO } from '@/dtos'
import { HttpRequest, HttpResponse } from '@/helpers'
import { IAllCharacteristicTypesUsecase } from '@/usecases/characteristic-type'

export class AllCharacteristicTypesControllerStub extends AllCharacteristicTypesController {
  async perform (request: HttpRequest): Promise<HttpResponse> {
    return await super.perform(request)
  }
}

describe('AllCharacteristicTypesController', () => {
  const request: HttpRequest = {}

  const usecaseResponse: CharacteristicTypeDTO[] = [{
    id: 1,
    name: 'any_name'
  }]

  let sut: AllCharacteristicTypesControllerStub
  const usecase = mock<IAllCharacteristicTypesUsecase>()

  beforeAll(() => {
    usecase.execute.mockResolvedValue(usecaseResponse)
  })

  beforeEach(() => {
    sut = new AllCharacteristicTypesControllerStub(usecase)
  })

  test('Should call usecase', async () => {
    await sut.perform(request)

    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith()
  })

  test('Should return 500 if usecase throws', async () => {
    usecase.execute.mockRejectedValueOnce(new Error())

    const response = await sut.perform(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('code', 'AllCharacteristicTypesServerError')
    expect(response.body).toHaveProperty('message', 'Ops! Ocorreu um erro ao buscar os tipos de caracteristicas. Tente novamente mais tarde.')
  })

  test('Should return 200 on success', async () => {
    const response = await sut.perform(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('code', 'AllCharacteristicTypesSuccess')
    expect(response.body).toHaveProperty('message', 'Tipos de caracteristicas consultadas com sucesso.')
    expect(response.body).toHaveProperty('data', usecaseResponse)
  })
})
