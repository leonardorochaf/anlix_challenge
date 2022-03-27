import { mock } from 'jest-mock-extended'

import { PatientByIdRecentCharByIdController, PatientByIdRecentCharByIdRequest } from '@/controllers/patient'
import { PatientDTO } from '@/dtos'
import { HttpResponse } from '@/helpers'
import { IPatientByIdRecentCharsUsecase } from '@/usecases/patient'
import { IValidator } from '@/validation'
import { PatientNotFoundError } from '@/errors'

class PatientByIdRecentCharByIdControllerStub extends PatientByIdRecentCharByIdController {
  async perform (request: PatientByIdRecentCharByIdRequest): Promise<HttpResponse> {
    return await super.perform(request)
  }
}

describe('PatientByIdRecentCharByIdController', () => {
  const request: PatientByIdRecentCharByIdRequest = {
    pathParams: {
      patientId: '1',
      charId: '1'
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

  let sut: PatientByIdRecentCharByIdControllerStub
  const validator = mock<IValidator>()
  const usecase = mock<IPatientByIdRecentCharsUsecase>()

  beforeAll(() => {
    validator.validate.mockResolvedValue(null)
    usecase.execute.mockResolvedValue(usecaseResponse)
  })

  beforeEach(() => {
    sut = new PatientByIdRecentCharByIdControllerStub(validator, usecase)
  })

  test('Should call usecase with correct values', async () => {
    const patientId = +request.pathParams.patientId
    const charId = +request.pathParams.charId

    await sut.perform(request)

    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith({ patientId, charId })
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
    expect(response.body).toHaveProperty('code', 'PatientByIdRecentCharByIdServerError')
    expect(response.body).toHaveProperty('message', 'Ops! Ocorreu um erro ao buscar a característica do paciente. Tente novamente mais tarde.')
  })

  test('Should return 200 on success', async () => {
    const response = await sut.perform(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('code', 'PatientByIdRecentCharByIdSuccess')
    expect(response.body).toHaveProperty('message', 'Característica do paciente consultada com sucesso.')
    expect(response.body).toHaveProperty('data', usecaseResponse)
  })
})
