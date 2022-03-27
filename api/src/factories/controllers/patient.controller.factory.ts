import { AllPatientsByNameLikeController, AllPatientsCharsByDateController, PatientByIdRecentCharsController } from '@/controllers/patient'
import { Validator } from '@/validation'
import { AllPatientsByNameLikeValidationModel, AllPatientsCharsByDateValidationModel } from '@/validation/validation-models'
import { PatientByIdRecentCharsValidationModel } from '@/validation/validation-models/patient-by-id-recent-chars.validation.model'
import { allPatientsByNameLikeUsecaseFactory, allPatientsCharsByDateUsecaseFactory, patientByIdRecentCharsUsecaseFactory } from '../usecases/patient.usecase.factory'

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

export const patientByIdRecentCharsControllerFactory = (): PatientByIdRecentCharsController => {
  const validator = new Validator(PatientByIdRecentCharsValidationModel)
  const usecase = patientByIdRecentCharsUsecaseFactory()
  return new PatientByIdRecentCharsController(validator, usecase)
}
