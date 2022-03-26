import { ObjectType, Repository } from 'typeorm'

import { PgConnection } from '@/database'

export abstract class TypeormAbstractRepository {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) { }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
