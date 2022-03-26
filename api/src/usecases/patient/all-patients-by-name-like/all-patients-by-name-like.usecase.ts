import { PatientDTO } from '@/dtos'
import { IPatientRepository } from '@/repositories/interfaces'
import { IAllPatientsByNameLikeUsecase } from '@/usecases/patient'

export class AllPatientsByNameLikeUsecase implements IAllPatientsByNameLikeUsecase {
  constructor (private readonly patientRepository: IPatientRepository) { }

  async execute (params: { name: string }): Promise<PatientDTO[]> {
    return await this.patientRepository.getAllPatientsByNameLike(params)
  }
}
