import { IBackup } from 'pg-mem'

import { PgConnection } from '@/database'
import { PatientRepository } from '@/repositories/postgres'
import { initFakePgDb, characteristicTypeMock, patientMock, characteristicMock } from '@/tests/helpers/database/'
import { Characteristic, CharacteristicType, Patient } from '@/repositories/postgres/models'

describe('Patient Repository', () => {
  let sut: PatientRepository
  let connection: PgConnection
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await initFakePgDb([Patient, CharacteristicType, Characteristic])

    await connection.getRepository(Patient).save(patientMock)
    await connection.getRepository(CharacteristicType).save(characteristicTypeMock)
    await connection.getRepository(Characteristic).save(characteristicMock)

    backup = db.backup()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PatientRepository()
  })

  describe('getAllPatientsByNameLike', () => {
    test('Should return a list of patients that have a part of the name passed', async () => {
      const name = 'Alexa'

      const patients = await sut.getAllPatientsByNameLike({ name })

      expect(patients).toHaveLength(1)
      expect(patients[0]).toMatchObject(patientMock)
    })

    test('Should return a empty list if doesnt find a patient', async () => {
      const name = 'NonRegisteredName'

      const patients = await sut.getAllPatientsByNameLike({ name })

      expect(patients).toHaveLength(0)
    })
  })
})
