import { IPatientRepository } from '@/repositories/interfaces'
import { mock } from 'jest-mock-extended'
import { PatientByIdRecentCharByIdUsecase } from '@/usecases/patient'
import { PatientNotFoundError } from '@/errors'

describe('PatientByIdRecentCharById Usecase', () => {
  const params = {
    patientId: 1,
    charId: 1
  }

  const getPatientWithRecentCharByIdAndCharId = {
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
    characteristics: [
      {
        id: 1,
        date: new Date(),
        value: 0.1,
        characteristicType: {
          id: 1,
          name: 'ind_pulm'
        }
      }
    ]
  }

  let sut: PatientByIdRecentCharByIdUsecase
  const patientRepository = mock<IPatientRepository>()

  beforeAll(() => {
    patientRepository.getPatientWithRecentCharByIdAndCharId.mockResolvedValue(getPatientWithRecentCharByIdAndCharId)
  })

  beforeEach(() => {
    sut = new PatientByIdRecentCharByIdUsecase(patientRepository)
  })

  test('Should call Repository.getPatientWithRecentCharByIdAndCharId with correct values', async () => {
    await sut.execute(params)

    expect(patientRepository.getPatientWithRecentCharByIdAndCharId).toHaveBeenCalledTimes(1)
    expect(patientRepository.getPatientWithRecentCharByIdAndCharId).toHaveBeenLastCalledWith(params)
  })

  test('Should throw PatientNotFoundError if any getPatientWithRecentCharByIdAndCharId returns undefined', async () => {
    patientRepository.getPatientWithRecentCharByIdAndCharId.mockResolvedValueOnce(undefined)

    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(PatientNotFoundError)
  })

  test('Should return the response of any repositories', async () => {
    const response = await sut.execute(params)

    expect(response).toEqual(getPatientWithRecentCharByIdAndCharId)
  })
})
