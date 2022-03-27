import { PatientDTO } from '@/dtos'

export interface IPatientByIdRecentCharByIdUsecase {
  execute: (params: { patientId: number, charId: number }) => Promise<PatientDTO>
}
