import { IBackup } from 'pg-mem'
import moment from 'moment'

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

  describe('getPatientByIdCharByDateInterval', () => {
    const patientId = 1
    const minDate = moment().subtract(1, 'days').toISOString().split('T')[0]
    const maxDate = new Date().toISOString().split('T')[0]

    test('Should return undefined if no patient with given id is found', async () => {
      const nonExistantPatientId = 1000

      const patient = await sut.getPatientByIdCharByDateInterval({ patientId: nonExistantPatientId, minDate, maxDate })

      expect(patient).not.toBeDefined()
    })
    test('Should return a patient by its id with its carachteristics by a date interval filter', async () => {
      const patient = await sut.getPatientByIdCharByDateInterval({ patientId, minDate, maxDate })

      expect(patient).toBeDefined()
      expect(patient?.characteristics).toHaveLength(1)
      expect(patient).toMatchObject(patientMock)
    })

    test('Should return a patient by its id with an empty characteristics array if theres none in the date interval', async () => {
      const minDate = moment().add(20, 'days').toISOString().split('T')[0]
      const maxDate = moment().add(21, 'days').toISOString().split('T')[0]

      const patient = await sut.getPatientByIdCharByDateInterval({ patientId, minDate, maxDate })

      expect(patient).toBeDefined()
      expect(patient?.characteristics).toHaveLength(0)
      expect(patient).toMatchObject(patientMock)
    })
  })

  describe('getPatientByIdCharByValueInterval', () => {
    const patientId = 1
    const minValue = 0.5
    const maxValue = 1.5

    test('Should return undefined if no patient with given id is found', async () => {
      const nonExistantPatientId = 1000

      const patient = await sut.getPatientByIdCharByValueInterval({ patientId: nonExistantPatientId, minValue, maxValue })

      expect(patient).not.toBeDefined()
    })
    test('Should return a patient by its id with its carachteristics by a value interval filter', async () => {
      const patient = await sut.getPatientByIdCharByValueInterval({ patientId, minValue, maxValue })

      expect(patient).toBeDefined()
      expect(patient?.characteristics).toHaveLength(1)
      expect(patient).toMatchObject(patientMock)
    })

    test('Should return a patient by its id with an empty characteristics array if theres none in the value interval', async () => {
      const minValue = 0.1
      const maxValue = 0.2

      const patient = await sut.getPatientByIdCharByValueInterval({ patientId, minValue, maxValue })

      expect(patient).toBeDefined()
      expect(patient?.characteristics).toHaveLength(0)
      expect(patient).toMatchObject(patientMock)
    })
  })

  describe('getPatientByIdRecentChars', () => {
    const patientId = 1

    test('Should return undefined if no patient with given id is found', async () => {
      const nonExistantPatientId = 1000

      const patient = await sut.getPatientByIdRecentChars({ patientId: nonExistantPatientId })

      expect(patient).not.toBeDefined()
    })
    test('Should return a patient by its id with its carachteristics', async () => {
      const patient = await sut.getPatientByIdRecentChars({ patientId })

      expect(patient).toBeDefined()
      expect(patient?.characteristics).toHaveLength(1)
      expect(patient).toMatchObject(patientMock)
    })
  })
})
