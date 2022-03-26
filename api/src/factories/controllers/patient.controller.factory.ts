import { AllPatientsByNameLikeController, AllPatientsCharsByDateController } from '@/controllers/patient'
import { Validator } from '@/validation'
import { AllPatientsByNameLikeValidationModel, AllPatientsCharsByDateValidationModel } from '@/validation/validation-models'
import { allPatientsByNameLikeUsecaseFactory, allPatientsCharsByDateUsecaseFactory } from '../usecases/patient.usecase.factory'

export const allPatientsByNameLikeControllerFactory = (): AllPatientsByNameLikeController => {
  const validator = new Validator(AllPatientsByNameLikeValidationModel)
  const usecase = allPatientsByNameLikeUsecaseFactory()
  return new AllPatientsByNameLikeController(validator, usecase)
}

export const allPatientsCharsByDateControllerFactory = (): AllPatientsCharsByDateController => {
  const validator = new Validator(AllPatientsCharsByDateValidationModel)
  const usecase = allPatientsCharsByDateUsecaseFactory()
  return new AllPatientsCharsByDateController(validator, usecase)
}
