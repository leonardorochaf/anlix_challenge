import { AllCharacteristicTypesUsecase, IAllCharacteristicTypesUsecase } from '@/usecases/characteristic-type'
import { charTypeRepositoryFactory } from '../repositories/repositories.factory'

export const allCharacteristicTypesUsecaseFactory = (): IAllCharacteristicTypesUsecase => {
  const charTypeRepository = charTypeRepositoryFactory()
  return new AllCharacteristicTypesUsecase(charTypeRepository)
}
