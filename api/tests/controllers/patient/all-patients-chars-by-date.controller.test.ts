import { mock } from 'jest-mock-extended'

import { AllPatientsCharsByDateController, AllPatientsCharsByDateRequest } from '@/controllers/patient'
import { HttpResponse } from '@/helpers'
import { IValidator } from '@/validation'
import { IAllPatientsCharsByDateUsecase } from '@/usecases/patient'
import { PatientDTO } from '@/dtos'

class AllPatientsCharsByDateControllerStub extends AllPatientsCharsByDateController {
  async perform (request: AllPatientsCharsByDateRequest): Promise<HttpResponse> {
    return await super.perform(request)
  }
}

describe('AllPatientsCharsByDateController', () => {
  const request: AllPatientsCharsByDateRequest = {
    queryParams: {
      date: 'any_date'
    }
  }

  const usecaseResponse: PatientDTO[] = [{
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
    color: 'any_color',
    characteristics: [{
      id: 1,
      date: new Date(),
      value: 0.1,
      characteristicType: {
        id: 1,
        name: 'ind_pulm'
      }
    }]
  }]

  let sut: AllPatientsCharsByDateControllerStub
  const validator = mock<IValidator>()
  const usecase = mock<IAllPatientsCharsByDateUsecase>()

  beforeAll(() => {
    validator.validate.mockResolvedValue(null)
    usecase.execute.mockResolvedValue(usecaseResponse)
  })

  beforeEach(() => {
    sut = new AllPatientsCharsByDateControllerStub(validator, usecase)
  })

  test('Should call usecase with correct values', async () => {
    await sut.perform(request)

    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith({ date: request.queryParams.date })
  })

  test('Should return 500 if usecase throws', async () => {
    usecase.execute.mockRejectedValueOnce(new Error())

    const response = await sut.perform(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('code', 'AllPatientsCharsByDateServerError')
    expect(response.body).toHaveProperty('message', 'Ops! Ocorreu um erro ao buscar as características dos pacientes. Tente novamente mais tarde.')
  })

  test('Should return 200 on success', async () => {
    const response = await sut.perform(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('code', 'AllPatientsCharsByDateSucess')
    expect(response.body).toHaveProperty('message', 'Características dos pacientes consultadas com sucesso.')
    expect(response.body).toHaveProperty('data', usecaseResponse)
  })
})
