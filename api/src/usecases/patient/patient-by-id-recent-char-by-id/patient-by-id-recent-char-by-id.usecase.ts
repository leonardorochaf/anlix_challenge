import { PatientDTO } from '@/dtos'
import { PatientNotFoundError } from '@/errors'
import { IPatientRepository } from '@/repositories/interfaces'
import { IPatientByIdRecentCharByIdUsecase } from './patient-by-id-recent-char-by-id.usecase.interface'

export class PatientByIdRecentCharByIdUsecase implements IPatientByIdRecentCharByIdUsecase {
  constructor (private readonly patientRepository: IPatientRepository) { }

  async execute (params: { patientId: number, charId: number }): Promise<PatientDTO> {
    const patient = await this.patientRepository.getPatientWithRecentCharByIdAndCharId(params)

    if (!patient) {
      throw new PatientNotFoundError('Paciente não encontrado')
    }

    return patient
  }
}
