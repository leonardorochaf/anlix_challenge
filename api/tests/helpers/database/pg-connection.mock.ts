import { IMemoryDb, newDb } from 'pg-mem'

import { PgConnection } from '@/database/pg-connection'

export const initFakePgDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/repositories/postgre/models/index.ts']
  })

  await connection.synchronize()
  await PgConnection.getInstance().connect()
  return db
}
