import { PatientDTO } from '@/dtos'

export interface PatientByIdRecentCharByIdUsecase {
  execute: (params: { patientId: number, charId: number }) => Promise<PatientDTO>
}
