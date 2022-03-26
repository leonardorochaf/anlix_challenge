import { CharacteristicTypeDTO } from './characteristic-type.dto'

export type CharacteristicDTO = {
  id: number
  epoc: string
  value: number
  characteristicType: CharacteristicTypeDTO
}
