import { PatientDTO } from '@/dtos'

export interface IAllPatientsCharsByDateUsecase {
  execute: (params: { date: string }) => Promise<PatientDTO[]>
}
