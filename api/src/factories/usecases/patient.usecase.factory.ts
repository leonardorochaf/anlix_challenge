import { AllPatientsByNameLikeUsecase, IAllPatientsByNameLikeUsecase } from '@/usecases/patient'
import { patientRepositoryFactory } from '../repositories/repositories.factory'

export const allPatientsByNameLikeUsecaseFactory = (): IAllPatientsByNameLikeUsecase => {
  const patientRepository = patientRepositoryFactory()
  return new AllPatientsByNameLikeUsecase(patientRepository)
}
