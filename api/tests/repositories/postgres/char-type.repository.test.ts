import { IBackup } from 'pg-mem'

import { PgConnection } from '@/database'
import { CharacteristicTypeRepository } from '@/repositories/postgres'
import { initFakePgDb, characteristicTypeMock } from '@/tests/helpers/database/'
import { CharacteristicType } from '@/repositories/postgres/models'

describe('Patient Repository', () => {
  let sut: CharacteristicTypeRepository
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
    sut = new CharacteristicTypeRepository()
  })

  describe('getAllCharacteristics', () => {
    test('Should return all characteristic types saved on the db', async () => {
      const charTypes = await sut.getAllCharacteristics()

      expect(charTypes).toHaveLength(1)
    })
  })
})
