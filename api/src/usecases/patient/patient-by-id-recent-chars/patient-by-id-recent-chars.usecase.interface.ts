import { PatientDTO } from '@/dtos'

export interface IPatientByIdRecentCharsUsecase {
  execute: (params: { patientId: number, minDate?: string, maxDate?: string, minValue?: number, maxValue?: number }) => Promise<PatientDTO>
}
