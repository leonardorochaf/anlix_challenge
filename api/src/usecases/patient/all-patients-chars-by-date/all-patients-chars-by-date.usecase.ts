import { PatientDTO } from '@/dtos'
import { IPatientRepository } from '@/repositories/interfaces'
import { IAllPatientsCharsByDateUsecase } from './all-patients-chars-by-date.usecase.interface'

export class AllPatientsCharsByDateUsecase implements IAllPatientsCharsByDateUsecase {
  constructor (private readonly patientRepository: IPatientRepository) { }

  async execute (params: { date: string }): Promise<PatientDTO[]> {
    return await this.patientRepository.getAllPatientsCharsByDate(params)
  }
}
