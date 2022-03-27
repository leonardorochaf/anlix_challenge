import { AllCharacteristicTypesController } from '@/controllers/characteristic-type'
import { allCharacteristicTypesUsecaseFactory } from '../usecases/char-type.usecase.factory'

export const allCharacteristicTypesControllerFactory = (): AllCharacteristicTypesController => {
  const usecase = allCharacteristicTypesUsecaseFactory()
  return new AllCharacteristicTypesController(usecase)
}
