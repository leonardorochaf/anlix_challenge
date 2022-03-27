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
      .innerJoinAndMapMany('p.characteristics', Characteristic, 'c', 'c.paciente_cpf = p.cpf AND CAST(c.date AS DATE) = :date', { date: data.date })
      .leftJoinAndMapOne('c.characteristicType', CharacteristicType, 'ct', 'ct.id = c.tipo_caracteristica_id')
      .orderBy({ 'c.date': 'DESC' })
      .getMany()
  }

  async getPatientByIdCharByDateInterval (data: { patientId: number, minDate: string, maxDate: string }): Promise<Patient | undefined> {
    const repository = this.getRepository(Patient)

    return await repository.createQueryBuilder('p')
      .leftJoinAndMapMany('p.characteristics', Characteristic, 'c', 'c.paciente_cpf = p.cpf AND CAST(c.date AS DATE) BETWEEN :minDate AND :maxDate', { minDate: data.minDate, maxDate: data.maxDate })
      .leftJoinAndMapOne('c.characteristicType', CharacteristicType, 'ct', 'ct.id = c.tipo_caracteristica_id')
      .where('p.id = :patientId', { patientId: data.patientId })
      .orderBy({ 'c.date': 'DESC' })
      .limit(1)
      .getOne()
  }

  async getPatientByIdCharByValueInterval (data: { patientId: number, minValue: number, maxValue: number }): Promise<Patient | undefined> {
    const repository = this.getRepository(Patient)

    return await repository.createQueryBuilder('p')
      .leftJoinAndMapMany('p.characteristics', Characteristic, 'c', 'c.paciente_cpf = p.cpf AND c.value BETWEEN :minValue AND :maxValue', { minValue: data.minValue, maxValue: data.maxValue })
      .leftJoinAndMapOne('c.characteristicType', CharacteristicType, 'ct', 'ct.id = c.tipo_caracteristica_id')
      .where('p.id = :patientId', { patientId: data.patientId })
      .orderBy({ 'c.date': 'DESC' })
      .limit(1)
      .getOne()
  }

  async getPatientByIdRecentChars (data: { patientId: number }): Promise<Patient | undefined> {
    const repository = this.getRepository(Patient)

    return await repository.createQueryBuilder('p')
      .leftJoinAndMapMany('p.characteristics', Characteristic, 'c', 'c.paciente_cpf = p.cpf')
      .leftJoinAndMapOne('c.characteristicType', CharacteristicType, 'ct', 'ct.id = c.tipo_caracteristica_id')
      .where('p.id = :patientId', { patientId: data.patientId })
      .orderBy({ 'c.date': 'DESC' })
      .getOne()
  }

  async getPatientWithRecentCharByIdAndCharId (data: { patientId: number, charId: number }): Promise<Patient | undefined> {
    const repository = this.getRepository(Patient)

    return await repository.createQueryBuilder('p')
      .leftJoinAndMapMany('p.characteristics', Characteristic, 'c', 'c.paciente_cpf = p.cpf')
      .leftJoinAndMapOne('c.characteristicType', CharacteristicType, 'ct', 'ct.id = c.tipo_caracteristica_id')
      .where('p.id = :patientId', { patientId: data.patientId })
      .andWhere('ct.id = :charId', { charId: data.charId })
      .orderBy({ 'c.date': 'DESC' })
      .limit(1)
      .getOne()
  }
}
