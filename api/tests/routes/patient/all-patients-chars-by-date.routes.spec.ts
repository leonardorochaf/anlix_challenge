import request from 'supertest'
import { IBackup } from 'pg-mem'

import { PgConnection } from '@/database'
import { initFakePgDb, patientMock, characteristicTypeMock, characteristicMock } from '@/tests/helpers/database'
import { Characteristic, CharacteristicType, Patient } from '@/repositories/postgres/models'
import { constants } from '@/utils'
import { app } from '@/app'

describe('GET /patients/chars', () => {
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
  })

  it('Should return 400 with ValidationError', async () => {
    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/patients/chars`)

    expect(status).toBe(400)
    expect(body).toHaveProperty('error')
    expect(body.error).toHaveProperty('code', 'ValidationError')
    expect(body.error).toHaveProperty('message', 'Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.')
  })

  it('Should return 200 with a patient with empty characteristic array', async () => {
    const date = '2022-03-25'

    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/patients/chars?date=${date}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('code', 'AllPatientsCharsByDateSucess')
    expect(body).toHaveProperty('message', 'Características dos pacientes consultadas com sucesso.')
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveLength(1)
    expect(body.data[0]).toHaveProperty('characteristics')
    expect(body.data[0].characteristics).toHaveLength(0)
  })

  it('Should return 200 with a patient that have characteristics', async () => {
    const date = new Date().toISOString().split('T')[0]

    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/patients/chars?date=${date}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('code', 'AllPatientsCharsByDateSucess')
    expect(body).toHaveProperty('message', 'Características dos pacientes consultadas com sucesso.')
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveLength(1)
    expect(body.data[0]).toHaveProperty('characteristics')
    expect(body.data[0].characteristics).toHaveLength(1)
  })
})
