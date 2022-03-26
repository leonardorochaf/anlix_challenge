import { PatientDTO } from '@/dtos'

export interface IPatientRepository {
  getAllPatientsByNameLike: (data: { name: string }) => Promise<PatientDTO[]>
}
