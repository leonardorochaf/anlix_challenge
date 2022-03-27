import { ICharacteristicTypeRepository } from '@/repositories/interfaces'
import { mock } from 'jest-mock-extended'
import { AllCharacteristicTypesUsecase } from '@/usecases/characteristic-type'

describe('AllCharacteristicTypes Usecase', () => {
  const getAllCharacteristics = [{
    id: 1,
    name: 'any_name'
  }]

  let sut: AllCharacteristicTypesUsecase
  const charTypeRepository = mock<ICharacteristicTypeRepository>()

  beforeAll(() => {
    charTypeRepository.getAllCharacteristics.mockResolvedValue(getAllCharacteristics)
  })

  beforeEach(() => {
    sut = new AllCharacteristicTypesUsecase(charTypeRepository)
  })

  test('Should call Repository.getAllCharacteristics with correct values', async () => {
    await sut.execute()

    expect(charTypeRepository.getAllCharacteristics).toHaveBeenCalledTimes(1)
    expect(charTypeRepository.getAllCharacteristics).toHaveBeenCalledWith()
  })

  test('Should throw if Repository.getAllCharacteristics throws', async () => {
    charTypeRepository.getAllCharacteristics.mockRejectedValueOnce(new Error())

    const promise = sut.execute()

    await expect(promise).rejects.toThrow()
  })

  test('Should return the response of Repository.getAllCharacteristics', async () => {
    const response = await sut.execute()

    expect(response).toEqual(getAllCharacteristics)
  })
})
