import { mock } from 'jest-mock-extended'

import { IPatientRepository } from '@/repositories/interfaces'
import { AllPatientsCharsByDateUsecase } from '@/usecases/patient'

describe('AllPatientsCharsByDate Usecase', () => {
  const params = {
    date: 'any_date'
  }

  const getAllPatientsCharsByDate = [{
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
      },
      {
        id: 2,
        date: new Date(),
        value: 0.2,
        characteristicType: {
          id: 2,
          name: 'ind_card'
        }
      }
    ]
  }]

  let sut: AllPatientsCharsByDateUsecase
  const patientRepository = mock<IPatientRepository>()

  beforeAll(() => {
    patientRepository.getAllPatientsCharsByDate.mockResolvedValue(getAllPatientsCharsByDate)
  })

  beforeEach(() => {
    sut = new AllPatientsCharsByDateUsecase(patientRepository)
  })

  test('Should call Repository.getAllPatientsCharsByDate with correct values', async () => {
    await sut.execute(params)

    expect(patientRepository.getAllPatientsCharsByDate).toHaveBeenCalledTimes(1)
    expect(patientRepository.getAllPatientsCharsByDate).toHaveBeenCalledWith(params)
  })

  test('Should throw if Repository.getAllPatientsByNameLike throws', async () => {
    patientRepository.getAllPatientsCharsByDate.mockRejectedValueOnce(new Error())

    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow()
  })

  test('Should return the response of Repository.getAllPatientsByNameLike', async () => {
    const response = await sut.execute(params)

    expect(response).toEqual(getAllPatientsCharsByDate)
  })
})
