import { ILike } from 'typeorm'

import { IPatientRepository } from '../interfaces'
import { TypeormAbstractRepository } from '../typeorm.repository.abstract'
import { Patient } from './models'

export class PatientRepository extends TypeormAbstractRepository implements IPatientRepository {
  async getAllPatientsByNameLike (data: { name: string }): Promise<Patient[]> {
    const repository = this.getRepository(Patient)

    return await repository.find({
      where: {
        name: ILike(`%${data.name}%`)
      }
    })
  }
}
