import { createConnection, getConnection, getConnectionManager, getRepository, ObjectType, Repository } from 'typeorm'

export class PgConnection {
  private static instance?: PgConnection

  private constructor () { }

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) {
      PgConnection.instance = new PgConnection()
    }
    return PgConnection.instance
  }

  async connect (): Promise<void> {
    getConnectionManager().has('default')
      ? getConnection()
      : await createConnection()
  }

  async disconnect (): Promise<void> {
    await getConnection().close()
  }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    return getRepository(entity)
  }
}
