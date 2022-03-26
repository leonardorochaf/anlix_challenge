import { AllPatientsByNameLikeController } from '@/controllers/patient'
import { Validator } from '@/validation'
import { AllPatientsByNameLikeValidationModel } from '@/validation/validation-models'
import { allPatientsByNameLikeUsecaseFactory } from '../usecases/patient.usecase.factory'

export const allPatientsByNameLikeControllerFactory = (): AllPatientsByNameLikeController => {
  const validator = new Validator(AllPatientsByNameLikeValidationModel)
  const usecase = allPatientsByNameLikeUsecaseFactory()
  return new AllPatientsByNameLikeController(validator, usecase)
}
