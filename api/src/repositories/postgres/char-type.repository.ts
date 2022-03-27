import { ICharacteristicTypeRepository } from '../interfaces'
import { TypeormAbstractRepository } from '../typeorm.repository.abstract'
import { CharacteristicType } from './models'

export class CharacteristicTypeRepository extends TypeormAbstractRepository implements ICharacteristicTypeRepository {
  async getAllCharacteristics (): Promise<CharacteristicType[]> {
    const repository = this.getRepository(CharacteristicType)

    return await repository.find()
  }
}
