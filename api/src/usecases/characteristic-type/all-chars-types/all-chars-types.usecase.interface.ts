import { CharacteristicTypeDTO } from '@/dtos'

export interface IAllCharacteristicTypesUsecase {
  execute: () => Promise<CharacteristicTypeDTO[]>
}
