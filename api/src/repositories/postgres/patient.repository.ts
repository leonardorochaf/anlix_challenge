import { ILike } from 'typeorm'

import { IPatientRepository } from '../interfaces'
import { TypeormAbstractRepository } from '../typeorm.repository.abstract'
import { Characteristic, CharacteristicType, Patient } from './models'

export class PatientRepository extends TypeormAbstractRepository implements IPatientRepository {
  async getAllPatientsByNameLike (data: { name: string }): Promise<Patient[]> {
    const repository = this.getRepository(Patient)

    return await repository.find({
      where: {
        name: ILike(`%${data.name}%`)
      }
    })
  }

  async getAllPatientsCharsByDate (data: { date: string }): Promise<Patient[]> {
    const repository = this.getRepository(Patient)

    return await repository.createQueryBuilder('p')
      .leftJoinAndMapMany('p.characteristics', Characteristic, 'c', 'c.paciente_cpf = p.cpf AND CAST(c.date AS DATE) = :date', { date: data.date })
      .leftJoinAndMapOne('c.characteristicType', CharacteristicType, 'ct', 'ct.id = c.tipo_caracteristica_id')
      .orderBy({ 'c.date': 'DESC' })
      .getMany()
  }
}
