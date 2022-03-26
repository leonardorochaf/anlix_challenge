import { IPatientRepository } from '@/repositories/interfaces'
import { PatientRepository } from '@/repositories/postgres'

export const patientRepositoryFactory = (): IPatientRepository => {
  return new PatientRepository()
}
