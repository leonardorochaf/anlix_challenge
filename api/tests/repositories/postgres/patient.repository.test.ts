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

  describe('getAllPatientsCharsByDate', () => {
    test('Should return a list of patients with its carachteristics by a date filter', async () => {
      const date = new Date().toISOString().split('T')[0]

      const patients = await sut.getAllPatientsCharsByDate({ date })

      expect(patients).toHaveLength(1)
      expect(patients[0].characteristics).toHaveLength(1)
      expect(patients[0]).toMatchObject(patientMock)
    })

    test('Should return a list of patients with an empty characteristics array if theres none in the passed date', async () => {
      const date = '2022-03-25'

      const patients = await sut.getAllPatientsCharsByDate({ date })

      expect(patients).toHaveLength(1)
      expect(patients[0].characteristics).toHaveLength(0)
      expect(patients[0]).toMatchObject(patientMock)
    })
  })
})
