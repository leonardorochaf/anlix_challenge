import { AllPatientsByNameLikeUsecase, AllPatientsCharsByDateUsecase, IAllPatientsByNameLikeUsecase, IAllPatientsCharsByDateUsecase, IPatientByIdRecentCharsUsecase, PatientByIdRecentCharsUsecase } from '@/usecases/patient'
import { patientRepositoryFactory } from '../repositories/repositories.factory'

export const allPatientsByNameLikeUsecaseFactory = (): IAllPatientsByNameLikeUsecase => {
  const patientRepository = patientRepositoryFactory()
  return new AllPatientsByNameLikeUsecase(patientRepository)
}

export const allPatientsCharsByDateUsecaseFactory = (): IAllPatientsCharsByDateUsecase => {
  const patientRepository = patientRepositoryFactory()
  return new AllPatientsCharsByDateUsecase(patientRepository)
}

export const patientByIdRecentCharsUsecaseFactory = (): IPatientByIdRecentCharsUsecase => {
  const patientRepository = patientRepositoryFactory()
  return new PatientByIdRecentCharsUsecase(patientRepository)
}
