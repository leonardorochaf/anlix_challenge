import { mock } from 'jest-mock-extended'

import { HttpResponse } from '@/helpers'
import { AllPatientsByNameLikeController, AllPatientsByNameLikeRequest } from '@/controllers/patient'
import { IValidator } from '@/validation'
import { IAllPatientsByNameLikeUsecase } from '@/usecases/patient'

class AllPatientsByNameLikeControllerStub extends AllPatientsByNameLikeController {
  async perform (request: AllPatientsByNameLikeRequest): Promise<HttpResponse> {
    return await super.perform(request)
  }
}

describe('AllPatientsByNameLikeController', () => {
  const request: AllPatientsByNameLikeRequest = {
    queryParams: {
      name: 'any_name'
    }
  }

  const usecaseResponse = [{
    name: 'any_name',
    age: 20,
    cpf: 'any_cpf',
    rg: 'any_rg',
    birthday: 'any_date',
    gender: 'any_gender',
    zodiacSign: 'any_zodiac_sign',
    motherName: 'any_name',
    fatherName: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    cep: 'any_cep',
    address: 'any_address',
    number: 51,
    district: 'any_distric',
    city: 'any_city',
    state: 'any_state',
    phone: 'any_phone',
    cellphone: 'any_cellphone',
    heigth: '1,80',
    weigth: 80,
    bloodType: 'any_blood_type',
    color: 'any_color'
  }]

  let sut: AllPatientsByNameLikeControllerStub
  const validator = mock<IValidator>()
  const usecase = mock<IAllPatientsByNameLikeUsecase>()

  beforeAll(() => {
    validator.validate.mockResolvedValue(null)
    usecase.execute.mockResolvedValue(usecaseResponse)
  })

  beforeEach(() => {
    sut = new AllPatientsByNameLikeControllerStub(validator, usecase)
  })

  test('Should call usecase with correct values', async () => {
    await sut.perform(request)

    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith({ name: request.queryParams.name })
  })

  test('Should return 500 if usecase throws', async () => {
    usecase.execute.mockRejectedValueOnce(new Error())

    const response = await sut.perform(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('code', 'PatientsByNameLikeServerError')
    expect(response.body).toHaveProperty('message', 'Ops! Ocorreu um erro ao buscar os pacientes. Tente novamente mais tarde.')
  })

  test('Should return 200 on success', async () => {
    const response = await sut.perform(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('code', 'PatientsByNameLikeSuccess')
    expect(response.body).toHaveProperty('message', 'Pacientes encontrados com sucesso.')
    expect(response.body).toHaveProperty('data', usecaseResponse)
  })
})
