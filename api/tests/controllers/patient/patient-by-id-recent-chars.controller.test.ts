import { mock } from 'jest-mock-extended'

import { PatientByIdRecentCharsController, PatientByIdRecentCharsRequest } from '@/controllers/patient'
import { HttpResponse } from '@/helpers'
import { IValidator } from '@/validation'
import { IPatientByIdRecentCharsUsecase } from '@/usecases/patient'
import { PatientDTO } from '@/dtos'
import { PatientNotFoundError } from '@/errors'

class PatientByIdRecentCharsControllerStub extends PatientByIdRecentCharsController {
  async perform (request: PatientByIdRecentCharsRequest): Promise<HttpResponse> {
    return await super.perform(request)
  }
}

describe('PatientByIdRecentCharsController', () => {
  const request: PatientByIdRecentCharsRequest = {
    pathParams: {
      patientId: '1'
    },
    queryParams: {
      minDate: '2022-03-25',
      maxDate: '2022-03-26',
      minValue: '0.5',
      maxValue: '1.5'
    }
  }

  const usecaseResponse: PatientDTO = {
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
  }

  let sut: PatientByIdRecentCharsControllerStub
  const validator = mock<IValidator>()
  const usecase = mock<IPatientByIdRecentCharsUsecase>()

  beforeAll(() => {
    validator.validate.mockResolvedValue(null)
    usecase.execute.mockResolvedValue(usecaseResponse)
  })

  beforeEach(() => {
    sut = new PatientByIdRecentCharsControllerStub(validator, usecase)
  })

  test('Should call usecase with correct values', async () => {
    const patientId = +request.pathParams.patientId
    const { minDate, maxDate } = request.queryParams
    const minValue = +request.queryParams.minValue
    const maxValue = +request.queryParams.maxValue

    await sut.perform(request)

    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith({ patientId, minDate, maxDate, minValue, maxValue })
  })

  test('Should return 404 if usecase throws PatientNotFoundError', async () => {
    usecase.execute.mockRejectedValueOnce(new PatientNotFoundError('Paciente não encontrado.'))

    const response = await sut.perform(request)

    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('code', 'PatientNotFoundError')
    expect(response.body).toHaveProperty('message', 'Paciente não encontrado.')
  })

  test('Should return 500 if usecase throws', async () => {
    usecase.execute.mockRejectedValueOnce(new Error())

    const response = await sut.perform(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('code', 'PatientByIdRecentCharsServerError')
    expect(response.body).toHaveProperty('message', 'Ops! Ocorreu um erro ao buscar as características do paciente. Tente novamente mais tarde.')
  })

  test('Should return 200 on success', async () => {
    const response = await sut.perform(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('code', 'PatientByIdRecentCharsSuccess')
    expect(response.body).toHaveProperty('message', 'Características dos pacientes consultadas com sucesso.')
    expect(response.body).toHaveProperty('data', usecaseResponse)
  })
})
