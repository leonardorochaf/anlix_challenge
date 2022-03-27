import { PatientDTO } from '@/dtos'

export interface IPatientRepository {
  getAllPatientsByNameLike: (data: { name: string }) => Promise<PatientDTO[]>

  getAllPatientsCharsByDate: (data: { date: string }) => Promise<PatientDTO[]>

  getPatientByIdCharByDateInterval: (data: { patientId: number, minDate: string, maxDate: string }) => Promise<PatientDTO | undefined>

  getPatientByIdCharByValueInterval: (data: { patientId: number, minValue: number, maxValue: number }) => Promise<PatientDTO | undefined>

  getPatientByIdRecentChars: (data: { patientId: number }) => Promise<PatientDTO | undefined>
}
