import { CharacteristicTypeDTO } from '@/dtos'
import { ICharacteristicTypeRepository } from '@/repositories/interfaces'

export class AllCharacteristicTypesUsecase {
  constructor (private readonly characTypeRepository: ICharacteristicTypeRepository) { }

  async execute (): Promise<CharacteristicTypeDTO[]> {
    return await this.characTypeRepository.getAllCharacteristics()
  }
}
