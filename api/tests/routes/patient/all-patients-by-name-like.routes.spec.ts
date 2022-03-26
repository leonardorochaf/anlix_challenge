import request from 'supertest'

import { PgConnection } from '@/database'
import { Characteristic, CharacteristicType, Patient } from '@/repositories/postgres/models'
import { IBackup } from 'pg-mem'
import { characteristicMock, characteristicTypeMock, initFakePgDb, patientMock } from '@/tests/helpers/database'
import { app } from '@/app'
import { constants } from '@/utils'

describe('GET /patients', () => {
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
      .get(`${constants.apiPrefix}/patients`)

    expect(status).toBe(400)
    expect(body).toHaveProperty('error')
    expect(body.error).toHaveProperty('code', 'ValidationError')
    expect(body.error).toHaveProperty('message', 'Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.')
  })

  it('Should return 200 with empty array', async () => {
    const name = 'nonExistentName'

    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/patients?name=${name}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('code', 'PatientsByNameLikeSuccess')
    expect(body).toHaveProperty('message', 'Pacientes encontrados com sucesso.')
    expect(body).toHaveProperty('data')
    expect(body.data).toEqual([])
  })

  it('Should return 200 with found user', async () => {
    const name = 'Alex'

    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/patients?name=${name}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('code', 'PatientsByNameLikeSuccess')
    expect(body).toHaveProperty('message', 'Pacientes encontrados com sucesso.')
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveLength(1)
    expect(body.data[0]).toEqual(patientMock)
  })
})
