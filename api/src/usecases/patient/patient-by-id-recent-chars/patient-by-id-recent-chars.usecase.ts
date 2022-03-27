import { PatientDTO } from '@/dtos'
import { PatientNotFoundError } from '@/errors/patient-not-found.error'
import { IPatientRepository } from '@/repositories/interfaces'
import { IPatientByIdRecentCharsUsecase } from '@/usecases/patient'

export class PatientByIdRecentCharsUsecase implements IPatientByIdRecentCharsUsecase {
  constructor (private readonly patientRepository: IPatientRepository) { }

  async execute (params: { patientId: number, minDate?: string, maxDate?: string, minValue?: number, maxValue?: number }): Promise<PatientDTO> {
    let patient

    if (params.minDate && params.maxDate) {
      patient = await this.patientRepository.getPatientByIdCharByDateInterval({ patientId: params.patientId, minDate: params.minDate, maxDate: params.maxDate })
    } else if (params.minValue && params.maxValue) {
      patient = await this.patientRepository.getPatientByIdCharByValueInterval({ patientId: params.patientId, minValue: params.minValue, maxValue: params.maxValue })
    } else {
      patient = await this.patientRepository.getPatientByIdRecentChars(params)
    }

    if (!patient) {
      throw new PatientNotFoundError('Paciente não encontrado')
    }

    return patient
  }
}
