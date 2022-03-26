import { mock } from 'jest-mock-extended'

import { AllPatientsByNameLikeUsecase } from '@/usecases/patient'
import { IPatientRepository } from '@/repositories/interfaces'

describe('AllPatientsByNameLike Usecase', () => {
  const params = {
    name: 'any_name'
  }

  const getAllPatientsByNameLike = [{
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

  let sut: AllPatientsByNameLikeUsecase
  const patientRepository = mock<IPatientRepository>()

  beforeAll(() => {
    patientRepository.getAllPatientsByNameLike.mockResolvedValue(getAllPatientsByNameLike)
  })

  beforeEach(() => {
    sut = new AllPatientsByNameLikeUsecase(patientRepository)
  })

  test('Should call Repository.getAllPatientsByNameLike with correct values', async () => {
    await sut.execute(params)

    expect(patientRepository.getAllPatientsByNameLike).toHaveBeenCalledTimes(1)
    expect(patientRepository.getAllPatientsByNameLike).toHaveBeenCalledWith(params)
  })

  test('Should throw if Repository.getAllPatientsByNameLike throws', async () => {
    patientRepository.getAllPatientsByNameLike.mockRejectedValueOnce(new Error())

    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow()
  })

  test('Should return the response of Repository.getAllPatientsByNameLike', async () => {
    const response = await sut.execute(params)

    expect(response).toEqual(getAllPatientsByNameLike)
  })
})
