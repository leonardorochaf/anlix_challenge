import request from 'supertest'
import { IBackup } from 'pg-mem'

import { PgConnection } from '@/database'
import { initFakePgDb, patientMock, characteristicTypeMock, characteristicMock } from '@/tests/helpers/database'
import { Characteristic, CharacteristicType, Patient } from '@/repositories/postgres/models'
import { constants } from '@/utils'
import { app } from '@/app'

describe('GET /patients/:patientId/chars/:charIs', () => {
  let connection: PgConnection
  let backup: IBackup

  const patientId = 1
  const charId = 1

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
    const nonNumberId = 'abc'

    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/patients/${nonNumberId}/chars/${charId}`)

    expect(status).toBe(400)
    expect(body).toHaveProperty('error')
    expect(body.error).toHaveProperty('code', 'ValidationError')
    expect(body.error).toHaveProperty('message', 'Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.')
  })

  it('Should return 404 with PatientNotFoundError', async () => {
    const nonExistantPatientId = 1000

    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/patients/${nonExistantPatientId}/chars/${charId}`)

    expect(status).toBe(404)
    expect(body).toHaveProperty('error')
    expect(body.error).toHaveProperty('code', 'PatientNotFoundError')
    expect(body.error).toHaveProperty('message', 'Paciente não encontrado')
  })

  it('Should return 200 with found user', async () => {
    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/patients/${patientId}/chars/${charId}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('code', 'PatientByIdRecentCharByIdSuccess')
    expect(body).toHaveProperty('message', 'Característica do paciente consultada com sucesso.')
    expect(body).toHaveProperty('data')
    expect(body.data).toMatchObject(patientMock)
  })
})
