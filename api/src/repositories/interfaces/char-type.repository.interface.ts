import { CharacteristicTypeDTO } from '@/dtos'

export interface ICharacteristicTypeRepository {
  getAllCharacteristics: () => Promise<CharacteristicTypeDTO[]>
}
