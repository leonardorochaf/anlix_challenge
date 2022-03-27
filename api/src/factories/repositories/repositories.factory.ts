import { ICharacteristicTypeRepository, IPatientRepository } from '@/repositories/interfaces'
import { CharacteristicTypeRepository, PatientRepository } from '@/repositories/postgres'

export const patientRepositoryFactory = (): IPatientRepository => {
  return new PatientRepository()
}

export const charTypeRepositoryFactory = (): ICharacteristicTypeRepository => {
  return new CharacteristicTypeRepository()
}
