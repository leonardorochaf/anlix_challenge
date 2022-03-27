import request from 'supertest'
import { IBackup } from 'pg-mem'

import { PgConnection } from '@/database'
import { CharacteristicType } from '@/repositories/postgres/models'
import { characteristicTypeMock, initFakePgDb } from '@/tests/helpers/database'
import { app } from '@/app'
import { constants } from '@/utils'

describe('GET /char-types', () => {
  let connection: PgConnection
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await initFakePgDb([CharacteristicType])

    await connection.getRepository(CharacteristicType).save(characteristicTypeMock)

    backup = db.backup()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
  })

  it('Should return 200 with all characteristic types', async () => {
    const { status, body } = await request(app)
      .get(`${constants.apiPrefix}/char-types`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('code', 'AllCharacteristicTypesSuccess')
    expect(body).toHaveProperty('message', 'Tipos de caracteristicas consultadas com sucesso.')
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveLength(1)
    expect(body.data[0]).toEqual(characteristicTypeMock)
  })
})
