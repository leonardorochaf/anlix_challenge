import { PatientDTO } from '@/dtos/patient.dto'

export interface IAllPatientsByNameLikeUsecase {
  execute: (params: { name: string }) => Promise<PatientDTO[]>
}
