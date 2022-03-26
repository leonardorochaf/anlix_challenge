import { mock } from 'jest-mock-extended'

import { IPatientRepository } from '@/repositories/interfaces'
import { PatientByIdRecentCharsUsecase } from '@/usecases/patient'
import { PatientNotFoundError } from '@/errors'

describe('PatientByIdRecentChars Usecase', () => {
  const paramsWithDate = {
    patientId: 1,
    minDate: '2022-03-25',
    maxDate: '2022-03-26'
  }

  const paramsWithValue = {
    patientId: 1,
    minValue: 0.5,
    maxValue: 1.5
  }

  const params = {
    patientId: 1
  }

  const repositoriesResponse = {
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

  let sut: PatientByIdRecentCharsUsecase
  const patientRepository = mock<IPatientRepository>()

  beforeAll(() => {
    patientRepository.getPatientByCharByDateInterval.mockResolvedValue(repositoriesResponse)
    patientRepository.getPatientByIdCharByValueInterval.mockResolvedValue(repositoriesResponse)
    patientRepository.getPatientByIdRecentChars.mockResolvedValue(repositoriesResponse)
  })

  beforeEach(() => {
    sut = new PatientByIdRecentCharsUsecase(patientRepository)
  })

  test('Should call Repository.getPatientByCharByDateInterval if minDate/maxDate are defined', async () => {
    await sut.execute(paramsWithDate)

    expect(patientRepository.getPatientByCharByDateInterval).toHaveBeenCalledTimes(1)
    expect(patientRepository.getPatientByCharByDateInterval).toHaveBeenCalledWith(paramsWithDate)
    expect(patientRepository.getPatientByIdCharByValueInterval).toHaveBeenCalledTimes(0)
    expect(patientRepository.getPatientByIdRecentChars).toHaveBeenCalledTimes(0)
  })

  test('Should call Repository.getPatientByIdCharByValueInterval if minValue/maxValue are defined and minDate/maxDate are not', async () => {
    await sut.execute(paramsWithValue)

    expect(patientRepository.getPatientByIdCharByValueInterval).toHaveBeenCalledTimes(1)
    expect(patientRepository.getPatientByIdCharByValueInterval).toHaveBeenCalledWith(paramsWithValue)
    expect(patientRepository.getPatientByCharByDateInterval).toHaveBeenCalledTimes(0)
    expect(patientRepository.getPatientByIdRecentChars).toHaveBeenCalledTimes(0)
  })

  test('Should call Repository.getPatientByIdRecentChars if minValue/maxValue and minDate/maxDate are not defined', async () => {
    await sut.execute(params)

    expect(patientRepository.getPatientByIdRecentChars).toHaveBeenCalledTimes(1)
    expect(patientRepository.getPatientByIdRecentChars).toHaveBeenCalledWith(params)
    expect(patientRepository.getPatientByCharByDateInterval).toHaveBeenCalledTimes(0)
    expect(patientRepository.getPatientByIdCharByValueInterval).toHaveBeenCalledTimes(0)
  })

  test('Should throw PatientNotFoundError if any repository returns undefined', async () => {
    patientRepository.getPatientByIdRecentChars.mockResolvedValueOnce(undefined)

    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(PatientNotFoundError)
  })

  test('Should return the response of any repositories', async () => {
    const response = await sut.execute(params)

    expect(response).toEqual(repositoriesResponse)
  })
})
